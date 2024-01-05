import { checkName } from "@/src/server/actions";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

export default function CreateTeam() {
	const [isNameAvailable, setIsNameAvailable] = useState(false);
	const [Error, setError] = useState("");
	const [isWaiting, setIsWaiting] = useState(false);

	const { data } = useSession();
	useEffect(() => {
		if (isWaiting) setTimeout(() => setIsWaiting(false), 200);
	}, [isWaiting]);

	const nameHandler = async (name: string) => {
		if (!isWaiting) {
			setIsWaiting(true);
			const res = await checkName(name);
			if ((res.status === "success" && res.message === true) || false) {
				setIsNameAvailable(res.message);
			} else {
				setError(res.message as string);
			}
		}
	};

	return (
		<>
			{!data?.user.team && <div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto">
				<h1 className="text-xl text-center">Team management</h1>
				<form className="grid text-center border p-4 rounded">
					<h1>Create a Team</h1>
					<input
						onChange={(e) => nameHandler(e.target.value)}
						type="text"
						placeholder="Team Name"
						className=" bg-white border rounded m-2 p-2" /* Todo: change border according to name availability*/
						required
					/>
					<input
						type="submit"
						value="Create Team"
						className="border rounded p-2 mt-6 hover:bg-cyan-500"
						disabled={isNameAvailable}
					/>
				</form>

				<form className="grid text-center border p-4 rounded">
					<h1>Join a Team</h1>
					<input
						onChange={(e) => nameHandler(e.target.value)}
						type="text"
						className=" bg-white border rounded m-2 p-2" /* Todo: change border according to name availability*/
						placeholder="Team Id"
						required
					/>
					<input
						type="submit"
						className="border rounded p-2 mt-6 hover:bg-cyan-500"
						value="Join Team"
					/>
				</form>
			</div>
			}
		</>
	);
}

