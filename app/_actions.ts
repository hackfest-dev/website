"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import os from "os";

const verifyUser = async (userId: string) => {
	try {
		await prisma.user.update({
			where: { id: userId },
			data: { isVerified: true },
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error verifying user");
	}
};

const getTeamsList = async () => {
	try {
		return await prisma.team.findMany({
			include: {
				members: {
					include: { college: true },
				},
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error getting teams list");
	}
};
const downloadList = async () => {
	//console.log("download list");
	//return {message:"download list"};
	//
	try {
		const TeamsList = await prisma.team.findMany({
			include: {
				members: {
					include: {
						college: true,
					},
				},
			},
		});
		console.log(TeamsList);
		let csv = "";
		TeamsList.map((team) => {
			const leader = team.members.find(
				(member) => member.isLeader === true
			)?.name;
			const college = team?.members[0].college?.name;
			csv += `${os.EOL}${team.name},${
				college ? college : "Not Available"
			},${leader ? leader : "Not Available"},${team.members.length},`;
			team.members.map((member) => {
				csv += `"Name:${member?.name}\nPhone:${
					member.phone ? member.phone : "Not available"
				}\nEmail:${member.email ? member.email : "Not available"}"${
					os.EOL
				},,,,`;
			});
		});
		return { message: "success", csv };
	} catch (error) {
		console.log(error);
		return { message: "An error occurred!" };
	}
};

const updateProfile = async (data: FormData) => {
	try {
		const user = await getServerSession(authOptions);
		console.log(user);
		//get image from form data as file and upload it to cloudinary
		//get image url
		const adhaarUrl = "";
		const collegeIdUrl = "";
		await prisma.user.update({
			where: {
				id: user?.user.id,
			},
			data: {
				name: data.get("name") as string,
				adhaar: adhaarUrl,
				college_id: collegeIdUrl,
				phone: data.get("phone") as string,
				college: {
					connect: {
						id: data.get("college") as string,
					},
				},
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Something went wrong");
	}
	return "success";
};
export { verifyUser, getTeamsList, downloadList, updateProfile };
