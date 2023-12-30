"use client";
import { getOptionsData, getUserByEmail, updateProfile } from "@/app/_actions";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

export default function EditProfile() {
	//Define states
	const [colleges, setColleges] = useState<{ id: string; name: string }[]>(
		[]
	);
	const [courses, setCourses] = useState<string[]>([]);
	const [states, setStates] = useState<string[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [CollegeIdUrl, setCollegeIdUrl] = useState("");
	const [AdhaarUrl, setAdhaarUrl] = useState("");

	// Fetch data and initialize the form
	useEffect(() => {
		(async () => {
			const data = await getSession();
			if (!data) return signIn("google");
			const user = await getUserByEmail(data.user.email as string);
			const { courses, states, colleges } = await getOptionsData();
			setColleges(colleges);
			setCourses(courses);
			setStates(states);
			setUser(user);
			setCollegeIdUrl(user?.college_id || "");
			setAdhaarUrl(user?.adhaar || "");
			setIsLoading(false);
		})();
	}, []);

	// Hide success message after 3 seconds
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				setIsSuccess(false);
			}, 3000);
		}
	}, [isSuccess]);

	// Handle form submission
	const submit = async (e: FormData) => {
		await updateProfile(e);
		setIsSuccess(true);
	};

	// Preview images
	const previewCollegeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const url = URL.createObjectURL(files[0]);
			setCollegeIdUrl(url);
		}
	};
	const previewAdhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const url = URL.createObjectURL(files[0]);
			setAdhaarUrl(url);
		}
	};

	return (
		<>
			{/* Show loading while intializing */}
			{isLoading && (
				<div className=" sm:p-4 rounded grid sm:max-w-xl m-auto">
					Loading...
				</div>
			)}
			{!isLoading && (
				<form
					action={(e) => {
						submit(e);
					}}
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
					<select
						name="college"
						className="bg-white border shadow-gray-50 rounded m-2 p-2"
					>
						<option value="" disabled selected>
							Select College
						</option>
						{colleges.map((college) => {
							return (
								<option
									key={college.id}
									value={college.id}
									selected={
										college.id === user?.collegeId
											? true
											: false
									}
								>
									{college.name}
								</option>
							);
						})}
					</select>

					{/* list of states*/}
					<select
						name="state"
						className=" bg-white border shadow-gray-50 rounded m-2 p-2"
					>
						<option value="" disabled selected>
							Select State
						</option>
						{states.map((state, index) => {
							return (
								<option
									key={index}
									value={state}
									selected={
										state === user?.state ? true : false
									}
								>
									{state}
								</option>
							);
						})}
					</select>

					{/* list of courses*/}
					<select
						name="course"
						className=" bg-white border shadow-gray-50 rounded m-2 p-2"
					>
						<option value="" disabled selected>
							Select Course
						</option>
						{courses.map((course, index) => {
							return (
								<option
									key={index}
									value={course}
									selected={
										course === user?.course ? true : false
									}
								>
									{course}
								</option>
							);
						})}
					</select>

					{/*ID's*/}
					<div className="flex flex-col">
						<h2 className="text-center mt-4">Upload College ID</h2>
						<input
							className=" bg-white border rounded m-2 p-2"
							type="file"
							name="collegeId"
							placeholder="College ID"
							onChange={previewCollegeId}
							id="collegeId"
						/>
						{CollegeIdUrl && (
							<span>
								<Image
									src={CollegeIdUrl || ""}
									alt="collegeID"
									width={100}
									height={100}
									unoptimized={true}
								/>
								<button
									onClick={() => {
										setCollegeIdUrl("");
										(
											document.getElementById(
												"collegeId"
											) as HTMLInputElement
										).value = "";
									}}
									className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
								>
									x
								</button>
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
						{AdhaarUrl && (
							<span>
								<Image
									src={AdhaarUrl || ""}
									alt="Adhaar"
									width={100}
									height={100}
									unoptimized={true}
								/>{" "}
								<button
									onClick={() => {
										setCollegeIdUrl("");
										(
											document.getElementById(
												"adhaar"
											) as HTMLInputElement
										).value = "";
									}}
									className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
								>
									x
								</button>
							</span>
						)}
					</div>

					<button
						type="submit"
						className="border rounded p-2 mt-6 hover:bg-cyan-500"
					>
						Submit
					</button>
					<h1 className="text-center text-xl text-green-500">
						{isSuccess ? "Success" : ""}
					</h1>
				</form>
			)}
		</>
	);
}
