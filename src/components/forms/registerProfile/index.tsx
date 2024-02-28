import RegisterProfileForm from "./registerProfile";
import { Courses } from "@prisma/client";
import { api } from "~/utils/api";

export default async function RegisterProfile() {
  const user = api.user.getUserWithCollege.useQuery();

  const colleges = api.college.getColleges.useQuery();

  const courses: string[] = Object.entries(Courses).map(([, value]) => value);

  return (
    <RegisterProfileForm
      user={user.data}
      colleges={colleges.data}
      courses={courses}
    />
  );
}
