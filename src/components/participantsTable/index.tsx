'use client';
import { verifyUser } from '@/src/server/actions';
import { TeamsData } from '@/src/types';
import Image from 'next/image';
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableHeader,
} from '@/src/components/ui/table';

export default function ParticipantsTable({ data }: { data: TeamsData[] }) {
  return (
    <>
      <Table className="m-auto w-full" aria-label="Files">
        <TableHeader className="border-2">
          <TableHead className={'p-4 border-2'}>
            Name
          </TableHead>
          <TableHead className={'p-4 border-2'}>College</TableHead>
          <TableHead className={'p-4 border-2'}>ID</TableHead>
          <TableHead className={'p-4 border-2'}>Adhaar</TableHead>
          <TableHead className={'p-4 border-2'}>Payment Status</TableHead>
          <TableHead className={'p-4 border-2'}>Action</TableHead>
        </TableHeader>
        <TableBody>
          {/*Loop over members and insert TableRows*/}
          {data.map((element) => {
            return element.members.map((member, index) => {
              return (
                <>
                  <TableRow className={'border p-2 text-xl'}>
                    <TableCell>Team: {element.name}</TableCell>
                  </TableRow>
                  <TableRow key={index}>
                    <TableCell className={'text-center border p-4'}>
                      {member.name}
                    </TableCell>
                    <TableCell className={'text-center border p-4'}>
                      {member.college?.name}
                    </TableCell>
                    <TableCell className={'text-center border p-4'}>
                      <Image
                        src={member.college_id ? member.college_id : ''}
                        alt="ID"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </TableCell>
                    <TableCell className={'text-center border p-4'}>
                      <Image
                        src={member.adhaar ? member.adhaar : ''}
                        alt="Adhaar"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </TableCell>
                    <TableCell className={'text-center border p-4'}>
                      {member.paymentStatus}
                    </TableCell>
                    <TableCell className={'text-center border p-4'}>
                      <button
                        data-uid={member.id}
                        onClick={(e) => {
                          const id = e.currentTarget.getAttribute('data-uid');
                          console.log(id);
                          if (id) verifyUser({ userId: id });
                        }}
                        className="bg-white p-4 rounded text-black"
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
