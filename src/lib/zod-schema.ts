import { z } from 'zod';

export const exampleZ = z.object({
  name: z.string(),
});

export type Example = z.infer<typeof exampleZ>;
