import { Courses } from '@prisma/client';
import { z } from 'zod';

const updateUserZ = z.object({
  userId: z.string(),
});

const updateProfileZ = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: 'Phone number should be at least 10 characters long' })
    .max(10, { message: 'Phone number should be at most 10 characters long' })
    .optional(),
  college: z.string().optional(),
  state: z.string().optional(),
  course: z.custom<Courses>().optional(),
  aadharFile: z.custom<File>().optional(),
  collegeIdFile: z.custom<File>().optional(),
});

export { updateUserZ, updateProfileZ };
