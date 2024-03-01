import { States } from "@prisma/client";
import {
    TableCell,
    TableHead,
    TableRow,
    Table,
    TableBody,
    TableHeader,
  } from "~/components/ui/table";
  interface TableProps {
    data: ({
        college: {
            id: string;
            name: string;
            state: States;
        } | null;
    } & {
        id: number;
        code: string;
        referrer: string;
        collegeId: string;
        name: string;
        contact: string;
    })[] | undefined;
}
export default function ReferralsTable(data:TableProps){

    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referral Code</TableHead>
                        <TableHead>College</TableHead>
                        <TableHead>College ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Referrer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((referral) => {
                        return(
                            <TableRow key={referral.id}>
                                <TableCell>{`HF2024_${("00" + referral.id).slice(-3)}`}</TableCell>
                                <TableCell>{referral?.college?.name}</TableCell>
                                <TableCell>{referral.collegeId}</TableCell>
                                <TableCell>{referral.name}</TableCell>
                                <TableCell>{referral.contact}</TableCell>
                                <TableCell>{referral.referrer}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}