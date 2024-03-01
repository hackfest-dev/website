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
import { type inferRouterOutputs } from "@trpc/server";
import { type userRouter } from "~/server/api/routers/user";

export const Profile: React.FC<{
  user:
    | inferRouterOutputs<typeof userRouter>["getUserWithTeam"]
    | null
    | undefined;
  refetch: () => void;
}> = ({ user, refetch }) => {
  const colleges = api.college.getColleges.useQuery();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Your profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 px-2">
        <Card className="mx-2 w-full p-4 md:w-fit">
          <CardContent className="flex items-center justify-center">
            <Image
              src={user!.image!}
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
        <EditProfileForm
          user={user!}
          colleges={colleges.data}
          refetch={refetch}
          collegeRefetch={colleges.refetch}
        />
      </CardContent>
    </Card>
  );
};
