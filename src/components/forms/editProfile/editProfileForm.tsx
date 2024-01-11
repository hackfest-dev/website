"use client";
import { College, User } from "@prisma/client";
import { updateProfile } from "@/src/server/actions";
import { useState } from "react";
import Image from "next/image";

const EditProfileForm = ({
	user,
	colleges,
	states,
	courses,
}: {
	user: User & {
		college: College | null;
	};
	colleges: {
		id: string;
		name: string;
	}[];
	states: string[];
	courses: string[];
}) => {
	const [collegeId, setCollegeId] = useState<{
		url: string;
		file: File | undefined;
	}>();
	const [aadhaar, setAadhaar] = useState<{
		url: string;
		file: File | undefined;
	}>();

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState<string>("");

	const previewCollegeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const url = URL.createObjectURL(files[0]);
			setCollegeId({ url, file: files[0] });
		}
	};

	const previewAdhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const url = URL.createObjectURL(files[0]);
			setAadhaar({ url, file: files[0] });
		}
	};

	return (
		<form
			onSubmit={async (e) => {
				setLoading(true);
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				formData.append("collegeId", collegeId?.file || "");
				const res = await updateProfile(formData);
				formData.append("adhaar", aadhaar?.file || "");
				setError(res.message);
				setLoading(false);
			}}
			className="border sm:p-4 text-black rounded grid sm:max-w-xl m-auto"
		>
			<h1 className="text-center text-xl">Update Profile</h1>
			<p
				className={`text-center ${
					error.includes("updated")
						? "text-green-500"
						: "text-red-500"
				}`}
			>
				{error}
			</p>
			<input
				className="border rounded p-1 m-2"
				type="text"
				name="name"
				placeholder="Name"
				defaultValue={user.name || ""}
			/>
			<input
				className="border rounded p-1 m-2"
				type="number"
				name="phone"
				placeholder="Phone"
				defaultValue={user.phone || ""}
			/>

			{/* list of colleges*/}
			<select
				name="college"
				className="bg-white border shadow-gray-50 rounded m-2 p-2"
				defaultValue={user.college?.id || undefined}
			>
				<option value="" disabled>
					Select College
				</option>
				{colleges.map((college) => {
					return (
						<option key={college.id} value={college.id}>
							{college.name}
						</option>
					);
				})}
			</select>

			{/* list of states*/}
			<select
				name="state"
				className=" bg-white border shadow-gray-50 rounded m-2 p-2"
				defaultValue={user?.state || undefined}
			>
				<option value="" disabled>
					Select State
				</option>
				{states.map((state, index) => {
					return (
						<option key={index} value={state}>
							{state}
						</option>
					);
				})}
			</select>

			{/* list of courses*/}
			<select
				name="course"
				className=" bg-white border shadow-gray-50 rounded m-2 p-2"
				defaultValue={user?.course || undefined}
			>
				<option value="" disabled>
					Select Course
				</option>
				{courses.map((course, index) => {
					return (
						<option key={index} value={course}>
							{course}
						</option>
					);
				})}
			</select>

			{/*ID's*/}
			<div className="flex flex-col ">
				<h2 className="text-center mt-4">Upload College ID</h2>
				<input
					className=" bg-white border rounded m-2 p-2"
					type="file"
					name="collegeId"
					placeholder="College ID"
					onChange={previewCollegeId}
					id="collegeId"
				/>
				{(collegeId?.url || user?.college_id) && (
					<span>
						<Image
							src={collegeId?.url || user?.college_id || ""}
							alt="collegeID"
							width={100}
							height={100}
							unoptimized
						/>
						{user.college_id && !collegeId?.url && "Uploaded File"}
						{collegeId?.url && (
							<button
								onClick={() => {
									setCollegeId({ url: "", file: undefined });
									(
										document.getElementById(
											"collegeId"
										) as HTMLInputElement
									).value = "";
								}}
								className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
								type="button"
							>
								Close Preview
							</button>
						)}
					</span>
				)}
			</div>

			<div>
				<h2 className="text-center mt-4">Upload Adhaar ID</h2>
				<input
					className=" bg-white border rounded m-2 p-2"
					type="file"
					name="adhaar"
					placeholder="Adhaar img"
					onChange={previewAdhaar}
					id="adhaar"
				/>
				{(aadhaar?.url || user?.adhaar) && (
					<span>
						<Image
							src={aadhaar?.url || user?.adhaar || ""}
							alt="Adhaar"
							width={100}
							height={100}
							unoptimized
						/>{" "}
						{user?.adhaar && !aadhaar?.url && "Uploaded File"}
						{aadhaar?.url && (
							<button
								onClick={() => {
									setAadhaar({ url: "", file: undefined });
									(
										document.getElementById(
											"adhaar"
										) as HTMLInputElement
									).value = "";
								}}
								className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
								type="button"
							>
								Close Preview
							</button>
						)}
					</span>
				)}
			</div>

			<button
				type="submit"
				className=" border rounded p-2 mt-6 hover:bg-blue-700 hover:text-white font-semibold"
			>
				{loading ? "Updating..." : "Update"}
			</button>
		</form>
	);
};

export default EditProfileForm;
