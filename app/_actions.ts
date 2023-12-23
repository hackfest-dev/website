"use server";

import prisma from "@/lib/db";

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
			include:{
				members:{
					include:{college:true}
				}
			}
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error getting teams list");
	}
};

export { verifyUser, getTeamsList };
