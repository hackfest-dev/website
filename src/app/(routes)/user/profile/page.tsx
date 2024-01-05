import CreateTeam from "@/src/components/forms/createTeam";
import EditProfile from "@/src/components/forms/editProfile";
import TeamDetails from "@/src/components/forms/teamInfo";
import { getCurrentUser } from "@/src/lib/session";

export default async function Profile() {
	const user = await getCurrentUser();
	if (!user)
		return (
			<>
				<div className="pb-20 pt-32 bg-white text-black h-full flex self-center">
					Please login
				</div>
			</>
		);
	return (
		<>
			<div className="p-6 md:p-auto m-auto bg-white text-black min-h-screen md:flex self-center justify-evenly">
				<EditProfile />
				{!user.team?.id ? (
					<CreateTeam />
				) : (
					<TeamDetails teamid={user.team?.id} />
				)}
			</div>
		</>
	);
}
