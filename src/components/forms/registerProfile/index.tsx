import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/db";
import RegisterProfileForm from "./registerProfile";
import { Courses } from "@prisma/client";

export default async function RegisterProfile() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email! },
    include: { college: true },
  });

  const colleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  //TODO:get states
  const states: string[] = ["karnataka", "kerala"];
  const courses: string[] = Object.entries(Courses).map(([, value]) => value);

  return (
    <>
      <RegisterProfileForm
        user={user!}
        colleges={colleges}
        states={states}
        courses={courses}
      />
    </>
  );
}
