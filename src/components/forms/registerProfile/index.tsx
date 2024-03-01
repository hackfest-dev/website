import RegisterProfileForm from "./registerProfile";
import { Courses } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { api } from "~/utils/api";

export default function RegisterProfile() {
  const user = api.user.getUserWithCollege.useQuery();
  const colleges = api.college.getColleges.useQuery();
  const courses: string[] = Object.entries(Courses).map(([, value]) => value);

  if (user.isLoading || colleges.isLoading)
    return (
      <Card className="w-h-96 flex h-96 items-center justify-center gap-2">
        Loading...
        <Loader2Icon className="animate-spin" />
      </Card>
    );

  return (
    <RegisterProfileForm
      refetch={user.refetch}
      refetchColleges={colleges.refetch}
      user={user.data}
      colleges={colleges.data}
      courses={courses}
    />
  );
}
