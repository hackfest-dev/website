import { z, type infer as Infer } from 'zod';
import { getCurrentUser } from '@/src/lib/session';

import type { Session } from '@/src/lib/auth.config';
import prisma from '@/src/lib/db';

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
    if (!session) {
      return {
        error: true,
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

    if (!session) {
      return {
        error: true,
        message: 'Not Authenticated',
      };
    }
    if (session.role != 'ADMIN') {
      return {
        error: true,
        message: 'Not Authorized',
      };
    }
    return callback(value, {
      session,
      db: prisma,
    });
  };
