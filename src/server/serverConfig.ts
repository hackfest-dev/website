import { z, type infer as Infer } from 'zod';
import { getCurrentUser } from '@/src/lib/session';

import type { Session } from '@/src/lib/auth';
import { prisma } from '@/src/lib/db';

interface Context {
  session: Session['user'] | undefined;
  db: typeof prisma;
}

export const publicAction =
  <T extends z.ZodObject<any, any>>(
    schema: T,
    callback: (values: Infer<T>, ctx: Context) => Promise<any>
  ) =>
  async (value: Infer<T>) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return {
        message: result.error.errors[0].message,
      };
    }
    const session = await getCurrentUser();
    return callback(value, {
      session,
      db: prisma,
    });
  };

export const protectedAction =
  <T extends z.ZodObject<any, any>>(
    schema: T,
    callback: (values: Infer<T>, ctx: Context) => Promise<any>
  ) =>
  async (value: Infer<T>) => {
    const session = await getCurrentUser();
    const result = schema.safeParse(value);
    if (!result.success) {
      return {
        message: result.error.errors[0].message,
      };
    }
    if (!session) {
      return {
        message: 'Not Authenticated',
      };
    }
    return callback(value, {
      session,
      db: prisma,
    });
  };

export const adminAction =
  <T extends z.ZodObject<any, any>>(
    schema: T,
    callback: (values: Infer<T>, ctx: Context) => Promise<any>
  ) =>
  async (value: Infer<T>) => {
    const session = await getCurrentUser();

    const result = schema.safeParse(value);
    if (!result.success) {
      return {
        message: result.error.errors[0].message,
      };
    }

    if (!session) {
      return {
        message: 'Not Authenticated',
      };
    }
    if (session.role != 'ADMIN') {
      return {
        message: 'Not Authorized',
      };
    }
    return callback(value, {
      session,
      db: prisma,
    });
  };
