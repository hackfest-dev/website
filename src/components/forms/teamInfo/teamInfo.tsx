'use client';

import { Team, User } from '@prisma/client';
import { useContext, useState } from 'react';
import { ProgressContext } from '../../progressProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import {
  Crown,
  Loader2Icon,
  LogOut,
  Trash2,
  UserRoundPlus,
} from 'lucide-react';
import { deleteTeam, leaveTeam } from '@/src/server/actions';
import Image from 'next/image';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';
import { AiOutlineCopy } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { Progress } from '@prisma/client';

export default function TeamInfo({
  teamdata,
  userId,
  userProgress,
}: {
  teamdata: Team & { members: User[] };
  userId: string;
  userProgress: Progress;
}) {
  const { currentState } = useContext(ProgressContext);
  const [isLoading, setIsLoading] = useState(false);

  if (currentState !== 1) return <></>;
  const leader = teamdata?.members?.find(
    (member) => member.id === userId && member?.isLeader
  );

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    leader?.isLeader ? await deleteTeam() : await leaveTeam();
    setIsLoading(false);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(teamdata?.id);
    toast.success('Team ID copied to clipboard', {
      position: 'bottom-center',
    });
  };

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-center">Team Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 px-2">
        <Card className="w-full">
          <CardContent>
            <div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto pt-4 p-0 md:p-4">
              <div className="flex flex-col lg:flex-row lg:gap-0 gap-3 justify-between items-center">
                <h1 className="text-2xl text-center font-bold uppercase">
                  {teamdata?.name || 'Not Available'}
                </h1>
                <Button
                  onClick={(e) => {
                    toast.promise(() => onSubmit(e), {
                      position: 'bottom-center',
                      loading: leader?.isLeader
                        ? 'Deleting Team...'
                        : 'Leaving Team...',
                      success: (message) => {
                        return leader?.isLeader ? 'Team Deleted' : 'Team Left';
                      },
                      error: (error) => {
                        return 'Something went wrong';
                      },
                    });
                  }}
                  disabled={isLoading || userProgress === 'COMPLETE'}
                  className={`${isLoading ? 'cursor-not-allowed' : ''} ${
                    leader?.isLeader
                      ? 'bg-red-600 text-white hover:bg-red-600/90'
                      : ''
                  } flex items-center gap-2`}
                >
                  {isLoading
                    ? 'Loading...'
                    : leader?.isLeader
                      ? 'Delete Team'
                      : 'Leave Team'}
                  {isLoading ? (
                    <Loader2Icon size={16} className="animate-spin" />
                  ) : leader?.isLeader ? (
                    <Trash2 size={16} />
                  ) : (
                    <LogOut size={16} />
                  )}
                </Button>
              </div>

              <div className="w-full">
                {teamdata?.members?.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex items-center mt-5 border p-5 rounded-xl md:mx-0 mx-2"
                    >
                      <div className="flex lg:flex-row lg:gap-0 gap-3 flex-col items-center justify-between w-full md:text-md text-sm">
                        <div className="relative">
                          <Image
                            src={member.image!}
                            alt="Profile image"
                            width={50}
                            height={50}
                            className="rounded-xl"
                          />
                          <div className="absolute -top-3 right-0 rotate-12 w-5 h-5">
                            {member?.isLeader && <Crown color="yellow" />}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-bold truncate">{member.name}</p>
                          <p className="truncate">{member.email}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1">
                          <p className="font-bold">{member.phone}</p>
                          <Badge>{member.isLeader ? 'Leader' : 'Member'}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                }) || 'Not Available'}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-2">
          <CardContent className="pt-5 text-center flex justify-between md:gap-0 gap-3 md:flex-row flex-col items-center text-md sm:text-sm">
            {userProgress === 'COMPLETE' ? (
              'You have completed Idea Submission'
            ) : 4 - teamdata?.members?.length === 0 ? (
              <>Your Team is full! Proceed to Idea submission.</>
            ) : (
              <>
                There&apos;s still room for {4 - teamdata?.members?.length} more
                teammate{4 - teamdata?.members?.length > 1 ? 's' : ''}!
              </>
            )}
            <Dialog>
              <DialogTrigger className="flex items-center gap-2" asChild>
                <Button
                  size={'sm'}
                  disabled={
                    4 - teamdata?.members?.length === 0 ||
                    userProgress === 'COMPLETE'
                  }
                >
                  <UserRoundPlus size={16} /> Add More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm md:w-full w-[90%]">
                <DialogHeader>
                  <DialogTitle>
                    {4 - teamdata?.members?.length === 0 ? (
                      'Your Team is full!'
                    ) : (
                      <>
                        There&apos;s still room for{' '}
                        {4 - teamdata?.members?.length} more teammate
                        {4 - teamdata?.members?.length > 1 ? 's' : ''}!
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription className="mt-2">
                    <div className="p-5 text-center flex flex-col justify-center">
                      <p className="text-xs bodyFont">
                        Share this link with your friends to add them to your
                        team!
                      </p>
                      <div className="flex items-center justify-evenly mt-2">
                        <input
                          type="url"
                          className="bg-white bg-opacity-20 rounded-lg text-sm p-2 bodyFont"
                          value={teamdata?.id}
                        />
                        <AiOutlineCopy
                          onClick={copyCode}
                          size={20}
                          className="cursor-pointer hover:text-gray-400"
                        />
                      </div>

                      <div className="flex items-center py-2 bodyFont">
                        <div className="flex-grow h-px bg-gray-600"></div>
                        <span className="flex-shrink text-sm px-4 italic font-light">
                          or
                        </span>
                        <div className="flex-grow h-px bg-gray-600"></div>
                      </div>

                      <Link
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Join my team at Hackfest 2024, 3 Day long Hackathon at NMAMIT, Nitte. Copy this Team ID: ${teamdata?.id}. Register here: ${process.env.NEXT_PUBLIC_BASE_URL}/register`
                        )}`}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 cursor-pointer text-sm bodyFont"
                      >
                        <BsWhatsapp /> Share on WhatsApp
                      </Link>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
