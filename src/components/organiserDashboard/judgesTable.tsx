import { States } from "@prisma/client";
import { FunctionComponent } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableHeader,
} from "~/components/ui/table";
import Spinner from "../spinner";
import { api } from "~/utils/api";



const JudgesTable: FunctionComponent<any> = ({ data }) => {
    const deleteJudge = api.organiser.removeJudge.useMutation({      
    })
  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-full max-w-screen-2xl rounded-md border p-10">
        {!data ? (
          <Table>
            <TableBody>
              <TableRow>
                <Spinner size="large" />
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Track</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((judge: any) => {
                return (
                  <TableRow key={judge.id}>
                    <TableCell>{judge?.user?.name}</TableCell>
                    <TableCell>{judge?.type}</TableCell>
                    <TableCell>{judge?.track}</TableCell>
                    <TableCell>{judge?.user?.phone || judge?.user?.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {data?.length === 0 && (
          <div className="flex w-full justify-center p-5">
            No Data To Display
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgesTable;
