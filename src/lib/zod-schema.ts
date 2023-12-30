import { z } from 'zod';

const updateUserZ = z.object({
  userId: z.string(),
});

const getUserByEmailZ = z.object({
  email: z.string(),
});

export { updateUserZ, getUserByEmailZ };
