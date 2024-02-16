import { College, Courses, States, User } from "@prisma/client";
import Image from "next/image";
import { LogoutButton } from "./logout";
import { Modal } from "../ui/modal";
import RegisterProfile from "../forms/registerProfile/registerProfile";
import { getServerSession } from "next-auth";
import { prisma } from "@/src/lib/db";
import { authOptions } from "@/src/lib/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BookText, Building2, Globe, Mail, Phone } from "lucide-react";
import { EditProfileForm } from "./editProfileForm";

export const Profile: React.FC<{
  user: User & {
    college: College | null;
  };
}> = async ({ user }) => {
  const session = await getServerSession(authOptions);

  const colleges = await prisma.college.findMany();

  //TODO:get states
  const courses: string[] = Object.entries(Courses).map(([, value]) => value);
  const states: string[] = Object.entries(States).map(([, value]) => value);
  return (
    <>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col  items-center justify-center gap-2 px-2">
          <Card className="w-fit">
            <CardContent className="flex justify-center items-center p-2">
              <Image
                src={user?.image!}
                alt="Profile image"
                width={100}
                height={100}
                className="rounded-xl"
              />
            </CardContent>
            <CardFooter className="p-2">
              <h1 className="text-md md:text-lg font-semibold whitespace-nowrap">{user?.name}</h1>
            </CardFooter>
          </Card>
          <EditProfileForm user={user} colleges={colleges} states={states} />
        </CardContent>
      </Card>
    </>
  );
};
