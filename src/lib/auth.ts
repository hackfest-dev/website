import NextAuth from 'next-auth';
import authConfig from '@/src/lib/auth.config';
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
});
