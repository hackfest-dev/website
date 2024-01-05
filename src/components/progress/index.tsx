import { Progress } from "@prisma/client";
import EditProfile from "../forms/editProfile";
import CreateTeam from "../forms/createTeam";
import React from "react";

export default function ProgressComponent({
	progress,
}: {
	progress: Progress;
}) {
	const progressComponentMap = new Map<string, React.ReactElement>();
	progressComponentMap.set("0", <EditProfile />);
	progressComponentMap.set("1", <CreateTeam />);
	//progressComponentMap.set("2", <MakePayment/>);
	//return form based on progress
	//
	//Create progress bar
	return (
		<>
			<div className="flex w-fit justify-evenly">
				<div className="bg-red-100 rounded-full w-fit p-6">
					1
				</div>
				<span className="self-center">----------{">"}</span>
				<div className="bg-red-100 rounded-full w-fit p-6">
					2
				</div>
				<span className="self-center">----------{">"}</span>
				<div className="bg-red-100 rounded-full w-fit p-6">
					3
				</div>
			</div>
		</>
	);
	//return progressComponentMap.get(progress.toString()) || <></>;
}
