"use client";
import { checkName, createTeam, joinTeam } from "@/src/server/actions";
import { useEffect, useState } from "react";

export default function CreateTeam() {
	const [isNameAvailable, setIsNameAvailable] = useState(false);
	const [Error, setError] = useState("");
	const [Message, setMessage] = useState("");
	const [isWaiting, setIsWaiting] = useState(false);
	const [Loading, setLoading] = useState(false);

	useEffect(() => {
		if (isWaiting) setTimeout(() => setIsWaiting(false), 200);
	}, [isWaiting]);

	const nameHandler = async (name: string) => {
		if (!isWaiting) {
			const res = await checkName(name);
			if (
				res.status === "success" &&
				(res.message === true || res.message === false)
			) {
				console.log(res.message);
				setIsNameAvailable(res.message);
			} else {
				setError(res.message as string);
			}
		}
	};

	useEffect(() => {
		if (Error) setTimeout(() => setError(""), 2000);
		if (Message) setTimeout(() => setMessage(""), 2000);
	}, [Error, Message]);

	return (
		<>
			<div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto">
				<h1 className="text-xl text-center">Team management</h1>
				{(Error || Message) && (
					<p
						className={`text-center ${
							!Error ? "text-green-500" : "text-red-500"
						}`}
					>
						{Error || Message}
					</p>
				)}

				<form
					className="grid text-center border my-4 p-4 rounded"
					onSubmit={async (e) => {
						setLoading(true);
						e.preventDefault();
						const formData = new FormData(
							e.target as HTMLFormElement
						);
						const res = await createTeam(formData);
						if (res.status === "error") setError(res.message);
						if (res.status === "success") setMessage(res.message);
						setLoading(false);
					}}
				>
					<h1>Create a Team</h1>

					<input
						onChange={(e) => nameHandler(e.target.value)}
						type="text"
						placeholder="Team Name"
						className={`text-center bg-white border rounded m-2 p-2 ${
							isNameAvailable ? "bg-green-100" : "bg-red-100"
						}`}
						name="teamname"
						required
					/>
					<button
						type="submit"
						className={`border rounded p-2 mt-6 hover:bg-blue-700 hover:text-white font-semibold ${
							!isNameAvailable && "cursor-not-allowed"
						}`}
						disabled={!isNameAvailable}
					>
						Create Team
					</button>
				</form>

				<form
					className="grid text-center border p-4 rounded"
					onSubmit={async (e) => {
						setLoading(true);
						e.preventDefault();
						const formData = new FormData(
							e.target as HTMLFormElement
						);
						const res = await joinTeam(formData);
						if (res.status === "error") setError(res.message);
						if (res.status === "success") setMessage(res.message);
						setLoading(false);
					}}
				>
					<h1>Join a Team</h1>
					<input
						onChange={(e) => nameHandler(e.target.value)}
						type="text"
						className=" bg-white border rounded m-2 p-2" /* Todo: change border according to name availability*/
						placeholder="Team Id"
						name="teamid"
						required
					/>
					<button
						type="submit"
						className=" border rounded p-2 mt-6 hover:bg-blue-700 hover:text-white font-semibold"
						value=""
					>
						Join Team
					</button>
				</form>
			</div>
		</>
	);
}
