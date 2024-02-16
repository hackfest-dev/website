'use client';

import { Team, User } from '@prisma/client';
import { useContext } from 'react';
import { ProgressContext } from '../../progressProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Crown, LogOut, Trash2 } from 'lucide-react';
import { deleteTeam, leaveTeam } from '@/src/server/actions';
import Image from 'next/image';

export default function TeamInfo({
  teamdata,
  userId,
}: {
  teamdata: Team & { members: User[] };
  userId: string;
}) {
  const { currentState } = useContext(ProgressContext);
  if (currentState !== 1) return <></>;
  const isLeader = teamdata?.members?.find(
    (member) => member.id === userId && member.isLeader
  );

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-center">Team Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 px-2">
        <Card className="w-full">
          <CardContent>
            <div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-center font-bold uppercase">
                  {teamdata?.name || 'Not Available'}
                </h1>
                <Button
                  onClick={async () => {
                    isLeader ? await deleteTeam() : await leaveTeam();
                  }}
                  className={`${
                    isLeader ? 'bg-red-600 text-white hover:bg-red-600/90' : ''
                  } flex items-center gap-2`}
                >
                  {isLeader ? 'Delete Team' : 'Leave Team'}
                  {isLeader ? <Trash2 size={16} /> : <LogOut size={16} />}
                </Button>
              </div>

              <div>
                {teamdata?.members?.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex items-center w-full mt-5 border p-5 rounded-xl"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="relative">
                          <Image
                            src={member.image!}
                            alt="Profile image"
                            width={50}
                            height={50}
                            className="rounded-xl"
                          />
                          <div className="absolute -top-3 right-0 rotate-12 w-5 h-5">
                            {member.isLeader && <Crown color="yellow" />}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold">{member.name}</p>
                          <p>{member.email}</p>
                        </div>
                      </div>
                    </div>
                  );
                }) || 'Not Available'}
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
