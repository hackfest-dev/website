import CreateTeam from "@/src/components/forms/createTeam";
import EditProfile from "@/src/components/forms/editProfile";
import TeamDetails from "@/src/components/forms/teamInfo";
import { prisma } from "@/src/lib/db";
import { getCurrentUser } from "@/src/lib/session";

export default async function RegisterPage() {
	const user = await getCurrentUser();

    const userInfo=user?await prisma.user.findUniqueOrThrow({
        where:{
            email:user?.email??undefined
        }
    }).catch(()=>{
        return null
    }):null
    console.log(userInfo?.name)

	if (!user)
		return (
			<>
				<div className="pb-20 pt-32 bg-white text-black h-full flex self-center">
					Please login
				</div>
			</>
		);
	return (
        <main className="p-6 md:p-auto m-auto mt-20 text-black min-h-screen md:flex self-center justify-evenly">
            <EditProfile />
            {/* {!user.team?.id ? (
                <CreateTeam />
            ) : (
                <TeamDetails teamid={user.team?.id} />
            )} */}
        </main>
	);
}