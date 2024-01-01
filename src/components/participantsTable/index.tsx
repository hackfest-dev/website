'use client';
import { verifyUser } from '@/src/server/actions';
import { TeamsData } from '@/src/types';
import Image from 'next/image';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';

export default function ParticipantsTable({ data }: { data: TeamsData[] }) {
  return (
    <>
      <Table className="m-auto w-full" aria-label="Files">
        <TableHeader className="border-2">
          <Column isRowHeader className={'p-4 border-2'}>
            Name
          </Column>
          <Column className={'p-4 border-2'}>College</Column>
          <Column className={'p-4 border-2'}>ID</Column>
          <Column className={'p-4 border-2'}>Adhaar</Column>
          <Column className={'p-4 border-2'}>Payment Status</Column>
          <Column className={'p-4 border-2'}>Action</Column>
        </TableHeader>
        <TableBody>
          {/*Loop over members and insert rows*/}
          {data.map((element) => {
            return element.members.map((member, index) => {
              return (
                <>
                  <Row className={'border p-2 text-xl'}>
                    <Cell>Team: {element.name}</Cell>
                  </Row>
                  <Row key={index}>
                    <Cell className={'text-center border p-4'}>
                      {member.name}
                    </Cell>
                    <Cell className={'text-center border p-4'}>
                      {member.college?.name}
                    </Cell>
                    <Cell className={'text-center border p-4'}>
                      <Image
                        src={member.college_id ? member.college_id : ''}
                        alt="ID"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </Cell>
                    <Cell className={'text-center border p-4'}>
                      <Image
                        src={member.adhaar ? member.adhaar : ''}
                        alt="Adhaar"
                        width="100"
                        height="100"
                        unoptimized
                      />
                    </Cell>
                    <Cell className={'text-center border p-4'}>
                      {member.paymentStatus}
                    </Cell>
                    <Cell className={'text-center border p-4'}>
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
