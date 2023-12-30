import { z } from 'zod';

const updateUserZ = z.object({
  userId: z.string(),
});

const updateProfileZ = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .max(10, {
      message: 'Phone number should be 10 digits',
    })
    .min(10, {
      message: 'Phone number should be 10 digits',
    })
    .optional(),
  college: z.string().optional(),
  state: z.string().optional(),
  course: z.string().optional(),
  aadharFile: z.custom<File>(),
  collegeIdFile: z.custom<File>(),
});

export { updateUserZ, updateProfileZ };
