import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as os from "os";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, res: NextResponse) {
	const user_session = await getServerSession();
	if (user_session && user_session.user?.email) {
		const user = await prisma.user.findUnique({
			where: {
				email: user_session.user?.email,
			},
		});

		if (user?.role === "ADMIN") {
			try {
				await fs.promises.appendFile(
					`/tmp/TeamsList.csv`,
					`TeamName,College,Team Leader,Member Count,Members`
				);

				const TeamsList = await prisma.team.findMany({
					include: {
						members: {
							include: {
								college: true,
							},
						},
					},
				});
				await Promise.all(
					TeamsList.map(async (team) => {
						const leader = team.members.find(
							(member) => member.isLeader === true
						)?.name;
						const college = team?.members[0].college?.name;
						await fs.promises.appendFile(
							`/tmp/TeamsList.csv`,
							`${os.EOL}${team.name},${
								college ? college : "Not Available"
							},${leader ? leader : "Not Available"},${
								team.members.length
							},`
						);
						return team.members.map(async (member) => {
							try {
								await fs.promises.appendFile(
									`/tmp/TeamsList.csv`,
									`"Name:${member?.name}\nPhone:${
										member.phone
											? member.phone
											: "Not available"
									}\nEmail:${
										member.email
											? member.email
											: "Not available"
									}"${os.EOL},,,,`
								);
							} catch (error) {
								throw error;
							}
						});
					})
				);
				const csv = await fs.promises.readFile(`/tmp/TeamsList.csv`);
				await fs.promises.rm(`/tmp/TeamsList.csv`);
				return new Response(csv, {
					headers: { "Content-Type": "blob" },
				});
			} catch (error) {
				console.log(error);
				return NextResponse.json({ message: "An error occurred!" });
			}
		} else {
			return NextResponse.json({ message: "Not Authorized!" });
		}
	}
}
