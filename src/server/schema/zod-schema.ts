import { Courses, Tracks, TshirtSize } from "@prisma/client";
import { z } from "zod";

const updateUserZ = z.object({
  userId: z.string(),
});

const updateProfileZ = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should be at least 10 characters long" })
    .max(10, { message: "Phone number should be at most 10 characters long" }),
  college: z
    .string({
      required_error: "College is required",
      invalid_type_error: "Something went wrong",
    })
    .min(1, { message: "College cannot be empty" }),
  tshirtSize: z.custom<TshirtSize>((val) => {
    return Object.values(TshirtSize).includes(val as TshirtSize);
  }),
  course: z.custom<Courses>((val) => {
    return Object.values(Courses).includes(val as Courses);
  }),
  aadhaarFile: z.custom<File>(),
  collegeIdFile: z.custom<File>(),
});

const editProfileZ = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .min(5, { message: "Name should be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should be at least 10 characters long" })
    .max(10, { message: "Phone number should be at most 10 characters long" }),
  college: z
    .string({
      required_error: "College is required",
      invalid_type_error: "Something went wrong",
    })
    .min(1, { message: "College cannot be empty" }),
  course: z.custom<Courses>((val) => {
    return Object.values(Courses).includes(val as Courses);
  }),
  aadhaarFile: z.custom<File>(),
  collegeIdFile: z.custom<File>(),
});

const submitIdeaZ = z.object({
  problemStatement: z
    .string()
    .min(1, { message: "Problem statement cannot be empty" })
    .max(100, {
      message: "Problem statement cannot exceed 100 characters",
    }),
  track: z.nativeEnum(Tracks, {
    required_error: "Track is required",
  }),
  referralCode: z.string().default(""),
  ppt: z.custom<File>(),
});

const createTeamZ = z.object({
  teamName: z
    .string()
    .min(1, { message: "Team name cannot be empty" })
    .max(10, { message: "Team name cannot exceed 10 characters" })
    .refine((value) => !value.startsWith(" ") && !value.endsWith(" "), {
      message: "Team name cannot start or end with a space",
    }),
});

const joinTeamZ = z.object({
  teamId: z.string().min(1, { message: "Team ID cannot be empty" }),
});

const createCollegeZ = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  state: z
    .string({
      invalid_type_error: "Something went wrong",
    })
    .min(1, { message: "State cannot be empty" }),
});

export {
  editProfileZ,
  updateUserZ,
  updateProfileZ,
  submitIdeaZ,
  createTeamZ,
  joinTeamZ,
  createCollegeZ,
};
