"use server";

import prisma from "@/lib/db";
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
		console.log(TeamsList)
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
		return { message: 'success', csv };
	} catch (error) {
		console.log(error);
		return { message: "An error occurred!" };
	}
};

export { verifyUser, getTeamsList, downloadList };
