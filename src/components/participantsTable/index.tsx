import { verifyUser } from "@/src/server/actions";
import { TeamsData } from "@/src/types";
import Image from "next/image";
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableHeader,
} from "~/components/ui/table";

export default function ParticipantsTable({ data }: { data: TeamsData[] }) {
  return (
    <>
      <Table className="m-auto w-full" aria-label="Files">
        <TableHeader className="border-2">
          <TableHead className={"border-2 p-4"}>Name</TableHead>
          <TableHead className={"border-2 p-4"}>College</TableHead>
          <TableHead className={"border-2 p-4"}>ID</TableHead>
          <TableHead className={"border-2 p-4"}>Adhaar</TableHead>
          <TableHead className={"border-2 p-4"}>Payment Status</TableHead>
          <TableHead className={"border-2 p-4"}>Action</TableHead>
        </TableHeader>
        <TableBody>
          {/*Loop over members and insert TableRows*/}
          {data.map((element) => {
            return element.members.map((member, index) => {
              return (
                <>
                  <TableRow className={"border p-2 text-xl"}>
                    <TableCell>Team: {element.name}</TableCell>
                  </TableRow>
                  <TableRow key={index}>
                    <TableCell className={"border p-4 text-center"}>
                      {member.name}
                    </TableCell>
                    <TableCell className={"border p-4 text-center"}>
                      {member.college?.name}
                    </TableCell>
                    <TableCell className={"border p-4 text-center"}>
                      <Image
                        src={member.college_id ? member.college_id : ""}
                        alt="ID"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </TableCell>
                    <TableCell className={"border p-4 text-center"}>
                      <Image
                        src={member.aadhaar ? member.aadhaar : ""}
                        alt="Aadhaar"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </TableCell>
                    <TableCell className={"border p-4 text-center"}>
                      {member.paymentStatus}
                    </TableCell>
                    <TableCell className={"border p-4 text-center"}>
                      <button
                        data-uid={member.id}
                        onClick={(e) => {
                          const id = e.currentTarget.getAttribute("data-uid");
                          console.log(id);
                          if (id) verifyUser({ userId: id });
                        }}
                        className="rounded bg-white p-4 text-black"
                      >
                        Verify
                      </button>
                    </TableCell>
                  </TableRow>
                </>
              );
            });
          })}
        </TableBody>
      </Table>
    </>
  );
}
