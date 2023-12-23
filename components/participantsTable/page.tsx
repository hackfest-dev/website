"use client";
import { getTeamsList, verifyUser } from "@/app/_actions";
import { College, Team, User } from "@prisma/client";
import Image from "next/image";
import {
	Cell,
	Column,
	Row,
	Table,
	TableBody,
	TableHeader,
} from "react-aria-components";

type members = User & { college: College | null };
type data = Team & { members: members[] };

export default function ParticipantsTable({ data }: { data: data[] }) {
	return (
		<>
			<Table className="m-auto w-full" aria-label="Files">
				<TableHeader className="border-2">
					<Column isRowHeader className={"p-4 border-2"}>
						Name
					</Column>
					<Column className={"p-4 border-2"}>College</Column>
					<Column className={"p-4 border-2"}>ID</Column>
					<Column className={"p-4 border-2"}>Adhaar</Column>
					<Column className={"p-4 border-2"}>Payment Status</Column>
					<Column className={"p-4 border-2"}>Action</Column>
				</TableHeader>
				<TableBody>
					{/*Loop over members and insert rows*/}
					{data.map((element) => {
						return element.members.map((member, index) => {
							return (
								<>
									<Row className={"border p-2 text-xl"}>
										<Cell>Team: {element.name}</Cell>
									</Row>
									<Row key={index}>
										<Cell
											className={"text-center border p-4"}
										>
											{member.name}
										</Cell>
										<Cell
											className={"text-center border p-4"}
										>
											{member.college?.name}
										</Cell>
										<Cell
											className={"text-center border p-4"}
										>
											<Image
												src={
													member.college_id
														? member.college_id
														: ""
												}
												alt="ID"
												width="100"
												height="100"
											/>
										</Cell>
										<Cell
											className={"text-center border p-4"}
										>
											<Image
												src={
													member.adhaar
														? member.adhaar
														: ""
												}
												alt="Adhaar"
												width="100"
												height="100"
											/>
										</Cell>
										<Cell
											className={"text-center border p-4"}
										>
											{member.paymentStatus}
										</Cell>
										<Cell
											className={"text-center border p-4"}
										>
											<button
												data-uid={member.id}
												onClick={(e) => {
													const id =
														e.currentTarget.getAttribute(
															"data-uid"
														);
														console.log(id)
													if (id) verifyUser(id);
												}}
												className="bg-white p-4 rounded text-black"
											>
												Verify
											</button>
										</Cell>
									</Row>
								</>
							);
						});
					})}
				</TableBody>
			</Table>
		</>
	);
}
