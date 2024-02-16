import { Courses, States, Tracks, TshirtSize } from "@prisma/client";
import { z } from "zod";

const updateUserZ = z.object({
  userId: z.string(),
});

const updateProfileZ = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
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
  otherCollege: z
    .string({
      invalid_type_error: "Something went wrong",
    })
    .default(""),
  otherCollegeState: z
    .string({
      invalid_type_error: "Something went wrong",
    })
    .default(""),
  //   state: z.string().optional(),
  tshirtSize: z.custom<TshirtSize>((val) => {
    return Object.values(TshirtSize).includes(val as TshirtSize);
  }),
  course: z.custom<Courses>((val) => {
    return Object.values(Courses).includes(val as Courses);
  }),
  aadhaarFile: z.custom<File>(),
  collegeIdFile: z.custom<File>(),
});

const submitIdeaZ = z.object({
  problemStatement: z
    .string()
    .min(1, { message: "Problem statement cannot be empty" }),
  track: z.nativeEnum(Tracks, {
    required_error: "Track is required",
  }),
  referralCode: z.string().default(""),
  ppt: z.custom<File>(),
});

export { updateUserZ, updateProfileZ, submitIdeaZ };
