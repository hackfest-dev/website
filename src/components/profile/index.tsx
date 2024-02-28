import { States, type College, type User } from "@prisma/client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EditProfileForm } from "./editProfileForm";
import { api } from "~/utils/api";

export const Profile: React.FC<{
  user: User & {
    college: College | null;
  };
}> = async ({ user }) => {
  const colleges = api.college.getColleges.useQuery();
  const states: string[] = Object.entries(States).map(([, value]) => value);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Your profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 px-2">
        <Card className="mx-2 w-full p-4 md:w-fit">
          <CardContent className="flex items-center justify-center">
            <Image
              src={user.image!}
              alt="Profile image"
              width={100}
              height={100}
              className="rounded-xl"
            />
          </CardContent>
          <CardFooter className="p-0">
            <h1 className="text-md w-full whitespace-nowrap text-center font-semibold md:text-lg">
              {user?.name}
            </h1>
          </CardFooter>
        </Card>
        <EditProfileForm user={user} colleges={colleges.data} states={states} />
      </CardContent>
    </Card>
  );
};
