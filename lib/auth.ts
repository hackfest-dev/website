import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  pages:{
    error:"/auth/error"
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email?.endsWith('@nmamit.in' || '@nitte.edu.in')) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },

    async redirect({ url }) {
      if(url.includes("/auth/error")){
        url=url.replace("/auth/error","/profile")
        url=url.replace(/\?.*/,"")
      }
      return url;
    },
  },

  events: {
    async signIn({ isNewUser, user }) {
      if (isNewUser) {
        const member = await prisma.members
          .findFirst({
            where: {
              email: {
                contains: user?.email!,
                mode: 'insensitive',
              },
            },
          })
          .catch((e) => {
            console.log(e);
          });

        if (member) {
          await prisma.user.update({
            where: {
              email: user?.email!,
            },
            data: {
              isMember: true,
            },
          });
        }
      }
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
    }),
  ],

  adapter: PrismaAdapter(prisma),
};

