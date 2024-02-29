import { useContext } from "react";
import { ProgressContext } from "../../progressProvider";
import ProfileForm from "../profileForm/profileForm";
import { type inferRouterOutputs } from "@trpc/server";
import { type collegeRouter } from "~/server/api/routers/college";
import { type userRouter } from "~/server/api/routers/user";

const RegisterProfileForm = ({
  user,
  colleges,
  courses,
}: {
  user:
    | inferRouterOutputs<typeof userRouter>["getUserWithCollege"]
    | null
    | undefined;
  colleges:
    | inferRouterOutputs<typeof collegeRouter>["getColleges"]
    | undefined
    | null;
  courses: string[];
}) => {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);

  return (
    <ProfileForm
      colleges={colleges}
      courses={courses}
      registerProp={{ currentState, maxState, setCurrentState, setMaxState }}
      user={user}
    />
  );
};

export default RegisterProfileForm;
