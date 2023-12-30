import { updateProfile } from "@/app/_actions";
import { getServerSession } from "next-auth";
import db from "@/lib/db";
import { signIn } from "next-auth/react";

export default async function EditProfile({
	colleges,
	courses,
	states,
}: {
	colleges: { id: string; name: string }[];
	courses: string[];
	states: string[];
}) {
	const session = await getServerSession();
	if (!session) return signIn("google");
	const user = await db.user.findUnique({
		where: {
			email: session.user.email || "",
		},
	});
	return (
		<form
			action={updateProfile}
			className="border sm:p-4 rounded grid sm:max-w-xl m-auto"
		>
			<h1 className="text-center text-xl">Update Profile</h1>
			<input
				className="border rounded p-1 m-2"
				type="text"
				name="name"
				placeholder="Name"
				defaultValue={user?.name || ""}
			/>
			<input
				className="border rounded p-1 m-2"
				type="number"
				name="phone"
				placeholder="Phone"
				defaultValue={user?.phone || ""}
			/>
			{/* list of colleges*/}
			<select className="bg-white border shadow-gray-50 rounded m-2 p-2">
				<option value="" disabled selected>
					Select College
				</option>
				{colleges.map((college) => {
					return (
						<option
							key={college.id}
							value={college.id}
							selected={
								college.id === user?.collegeId ? true : false
							}
						>
							{college.name}
						</option>
					);
				})}
			</select>
			{/* list of states*/}
			<select className=" bg-white border shadow-gray-50 rounded m-2 p-2">
				<option value="" disabled selected>
					Select State
				</option>
				{states.map((state, index) => {
					return (
						<option
							key={index}
							value={state}
							selected={state === user?.state ? true : false}
						>
							{state}
						</option>
					);
				})}
			</select>

			{/* list of courses*/}
			<select className=" bg-white border shadow-gray-50 rounded m-2 p-2">
				<option value="" disabled selected>
					Select Course
				</option>
				{courses.map((course, index) => {
					return (
						<option
							key={index}
							value={course}
							selected={course === user?.course ? true : false}
						>
							{course}
						</option>
					);
				})}
			</select>

			{/*ID's*/}
			<h2 className="text-center mt-4">Upload College ID</h2>
			<input
				className=" bg-white border rounded m-2 p-2"
				type="file"
				name="collegeId"
				placeholder="College ID"
			/>
			<h2 className="text-center mt-4">Upload Adhaar ID</h2>
			<input
				className=" bg-white border rounded m-2 p-2"
				type="file"
				name="adhaar"
				placeholder="Adhaar Image"
			/>
			<button
				type="submit"
				className="border rounded p-2 mt-6 hover:bg-cyan-500"
			>
				Submit
			</button>
		</form>
	);
}
