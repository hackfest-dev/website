import { prisma } from "@/src/lib/db";

export default async function TeamDetails({ teamid }: { teamid: string }) {
	const teamdata = await prisma.team.findUnique({
		where: { id: teamid },
		include: { members: true },
	});
	return (
		<>
			<div className="p-6 md:p-auto m-auto bg-white text-black min-h-screen md:flex self-center justify-evenly">
				<div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto p-4 border rounded">
					<h1 className="text-xl text-center font-bold border-b-2">
						Team Details
					</h1>
					<p className="font-semibold text-center border-b-2 p-4">
						Team Name: {teamdata?.name || "Not Available"}
					</p>
					<p className="text-center border-b-2 p-4">
						Team ID: {teamdata?.id || "Not Available"}
					</p>
					<div className="p-4">
						<h2 className="text-center p-4 font-semibold">
							Team Members:{" "}
						</h2>
						{teamdata?.members?.map((member) => {
							return (
								<div key={member.id} className="border-b p-3">
									<p>Name: {member.name} {member.isLeader && "(Leader)"}</p>
									<p>Email: {member.email}</p>
								</div>
							);
						}) || "Not Available"}
					</div>
				</div>
			</div>
		</>
	);
}
