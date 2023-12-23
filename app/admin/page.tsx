'use server'
import ParticipantsTable from "@/components/participantsTable/page";
import { getTeamsList } from "../_actions";

export default async function Admin() {
	const data = await getTeamsList()
	return (
		<>
			<div className="w-full border-b">
				<h1 className="text-4xl font-bold text-center my-10">Admin</h1>
			</div>

			<div className="overflow-x-scroll my-4 m-auto md:max-w-[70%]">
				<div className="">
					<h1 className="text-2xl font-bold text-center my-10">
						Participants
					</h1>
					<a href="/admin/downloadList" className="text-black p-3 mb-2 rounded float-right bg-white font-bold text-center ">
						Download
					</a>
				</div>
				<ParticipantsTable data={data}/>
			</div>
		</>
	);
}
