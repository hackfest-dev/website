import { auth } from '@/src/auth';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
