import { College, States, User } from '@prisma/client';
import Image from 'next/image';
import { prisma } from '@/src/lib/db';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { EditProfileForm } from './editProfileForm';

export const Profile: React.FC<{
  user: User & {
    college: College | null;
  };
}> = async ({ user }) => {
  const colleges = await prisma.college.findMany();
  const states: string[] = Object.entries(States).map(([, value]) => value);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Your profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 px-2">
        <Card className="p-4 mx-2 w-full md:w-fit">
          <CardContent className="flex justify-center items-center">
            <Image
              src={user?.image!}
              alt="Profile image"
              width={100}
              height={100}
              className="rounded-xl"
            />
          </CardContent>
          <CardFooter className="p-0">
            <h1 className="text-md md:text-lg font-semibold whitespace-nowrap text-center w-full">
              {user?.name}
            </h1>
          </CardFooter>
        </Card>
        <EditProfileForm user={user} colleges={colleges} states={states} />
      </CardContent>
    </Card>
  );
};
