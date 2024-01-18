import { Courses, Tracks } from "@prisma/client";
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
  //   state: z.string().optional(),
  course: z.custom<Courses>((val) => {
    return Object.values(Courses).includes(val as Courses);
  }),
  aadhaarFile: z.custom<File>(),
  collegeIdFile: z.custom<File>(),
});

const submitIdeaZ = z.object({
  problemStatement: z.string(),
  track: z.nativeEnum(Tracks),
  referralCode: z.string(),
  ppt: z.custom<File>(),
});

export { updateUserZ, updateProfileZ, submitIdeaZ };
