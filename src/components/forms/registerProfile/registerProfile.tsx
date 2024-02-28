import { useContext } from "react";
import { ProgressContext } from "../../progressProvider";
import ProfileForm from "../profileForm/profileForm";
import { College, User } from "@prisma/client";

const RegisterProfileForm = ({
  user,
  colleges,
  states,
  courses,
}: {
  user: User & {
    college: College | null;
  };
  colleges: {
    id: string;
    name: string;
    state: string;
  }[];
  states: string[];
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
      states={states}
    />
  );
};

export default RegisterProfileForm;
