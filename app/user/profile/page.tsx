"use server";

import EditProfile from "@/components/forms/editProfile/page";

export default async function Profile() {
	return (
		<>
			<div className="bg-white text-black min-h-screen flex self-center">
			<EditProfile colleges={[]} states={[]} courses={[]}/>
			</div>
		</>
	);
}
