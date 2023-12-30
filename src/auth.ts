import NextAuth from 'next-auth';
import authConfig from '@/src/lib/auth.config';
import { secrets } from './lib/secrets';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  secret: secrets.NEXTAUTH_SECRET as string,
  session: { strategy: 'jwt' },
  ...authConfig,
});
