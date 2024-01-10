"use server";
import { z } from "zod";
import { prisma } from "@/src/lib/db";
import { uploadFile } from "@/src/lib/utils/cloudinary";
import { protectedAction } from "./serverConfig";
import { updateUserZ, updateProfileZ } from "../lib/zod-schema";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../lib/session";

// -----------------User functions-----------------
// Set user as verified on successful verification
const verifyUser = protectedAction(updateUserZ, async (value, { db }) => {
	try {
		await db.user.update({
			where: { id: value.userId },
			data: { isVerified: true },
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error verifying user");
	}
});

// Update User Profile -- zod validation cannot be made using protectedAction utility
// For file uploads, we need to pass them as FormData
// Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
const updateProfile = async (formData: FormData) => {
	const obj = Object.fromEntries(formData.entries());
	const result = updateProfileZ.safeParse({
		...obj,
	});

	if (!result.success) {
		return {
			message: result.error.errors[0].message,
		};
	}

	const { data } = result;

	const session = await getCurrentUser();
	if (!session) {
		return {
			message: "Not Authenticated",
		};
	}

	const user = await prisma.user.findUnique({
		where: { id: session?.id },
		include: {
			college: true,
		},
	});

	//If ID is already there remove the existing one from cloudinary
	if (user?.adhaar) {
	}

	// upload files only if they exist otherwise set to existing url
	const adhaarUrl = obj.adhaar
		? await uploadFile(obj.adhaar as File)
		: user?.adhaar;
	const collegeIdUrl = obj.collegeId
		? await uploadFile(obj.collegeId as File)
		: user?.college_id;

	// code can be cleaned but it's ok to be lazy
	const hasNoChanges =
		user?.name === data.name &&
		user?.phone === data.phone &&
		adhaarUrl === user?.adhaar &&
		collegeIdUrl === user?.college_id &&
		user?.college?.id === data.college &&
		user?.state === data.state &&
		user?.course === data.course;

	if (hasNoChanges) {
		return { message: "No changes made" };
	}

	await prisma.user.update({
		where: { id: session?.id },
		data: {
			name: data.name,
			phone: data.phone,
			adhaar: adhaarUrl,
			college_id: collegeIdUrl,
			college: { connect: { id: data.college } },
			state: data.state,
			course: data.course,
		},
	});

	revalidatePath("/");

	return { message: "Profile updated successfully" };
};

// -------------Admin functions----------------

// -----------------Team controls-----------------
// Check name availability
const checkName = async (teamName: string) => {
	try {
		const team = await prisma.team.findFirst({
			where: {
				name: teamName,
			},
		});
		console.log(teamName,team);
		if (team?.id) {
			return { status: "success", message: false };
		}
		return { status: "success", message: true };
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong" };
	}
};
// Create a new team
const createTeam = async (data: FormData) => {
	try {
		console.log("Attempting to create team");
		const user = await getCurrentUser();
		if (user?.profileProgress !== "COMPLETE") {
			console.log("Incomplete user profile")
			return {
				status: "error",
				message: "Please complete your profile first",
			};
		}
		if (user?.team) {
			console.log("User already in a team")
			return { status: "error", message: "You are already in a team" };
		}
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				isLeader: true,
				team: {
					create: {
						name: data.get("teamname") as string,
					},
				},
			},
		});

		console.log("team created");
		return { status: "success", message: "Team created successfully" };
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong" };
	}
};

// Join a team by teamId
const joinTeam = async (data: FormData) => {
	try {
		const user = await getCurrentUser();
		if (user?.profileProgress !== "COMPLETE") {
			return {
				status: "error",
				message: "Please complete your profile first",
			};
		}
		if (user?.team) {
			return { status: "error", message: "You are already in a team" };
		}

		const team  = await prisma.team.findFirst({
			where:{
				id: data.get("teamid") as string,
			},
			include:{
				members:{
					where:{
						isLeader:true
					},
					include:{college:true}
				}
			}
		})
		if(!team){
			return { status: "error", message: "Team not found" };
		}
		const leader = team.members.find(member=>member.isLeader === true)
		if(user.college !== leader?.college?.name){
			return { status: "error", message: "Team members should be from same college only" };
		}
		await prisma.team.update({
			where: {
				id: data.get("teamid") as string,
			},
			data: {
				members: {
					connect: {
						id: user?.id,
					},
				},
			},
		});
		return { status: "success", message: "Joined team successfully" };
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong" };
	}
};

// Leave a team
const leaveTeam = async () => {
	try {
		const user = await getCurrentUser();
		await prisma.user.update({
			where: {
				id: user?.id,
			},
			data: {
				team: {
					disconnect: true,
				},
			},
		});
		return { status: "success", message: "Left team successfully" };
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong" };
	}
};
// delete a team by teamId
const deleteTeam = async () => {
	try {
		const user = await getCurrentUser();
		if (!user?.isLeader) {
			return {
				status: "error",
				message: "You are not the leader of this team",
			};
		}
		await prisma.team.delete({
			where: {
				id: user.team?.id,
			},
		});
		return { status: "success", message: "Team deleted successfully" };
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Something went wrong" };
	}
};

export {
	verifyUser,
	updateProfile,
	checkName,
	createTeam,
	joinTeam,
	leaveTeam,
	deleteTeam,
};
