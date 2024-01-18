import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/src/lib/db";
import { secrets } from "./secrets";
import type { Progress, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      team:
        | {
            id: string;
            name: string;
            isComplete: boolean;
            ideaSubmission: string | undefined;
          }
        | null
        | undefined;
      college: string;
      isLeader: boolean;
      phone: string;
      role: Role;
      profileProgress: Progress;
    } & DefaultSession["user"];
  }
}

export interface Session extends DefaultSession {
  user: {
    id: string;
    team:
      | {
          id: string;
          name: string;
          isComplete: boolean;
          ideaSubmission: string | undefined;
        }
      | null
      | undefined;
    college: string;
    isLeader: boolean;
    phone: string;
    role: Role;
    profileProgress: Progress;
  } & DefaultSession["user"];
}

export const authOptions: NextAuthOptions = {
  secret: secrets.NEXTAUTH_SECRET as string,

  session: {
    strategy: "jwt",
  },
  // pages: {
  // 	error: "/auth/error",
  // },
  callbacks: {
    // async redirect({ url }) {
    // 	if (url.includes("/auth/error")) {
    // 		url = url.replace("/auth/error", "/profile");
    // 		url = url.replace(/\?.*/, "");
    // 	}
    // 	return url;
    // },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
        include: {
          team: { include: { ideaSubmission: true } },
          college: true,
        },
      });
      if (!dbUser) {
        throw new Error("User not found");
      }
      session.user.id = dbUser.id;
      if (dbUser.team) {
        const team = {
          id: dbUser?.team?.id,
          name: dbUser?.team?.name,
          isComplete: dbUser?.team?.isComplete,
          ideaSubmission: dbUser?.team?.ideaSubmission?.pptUrl,
        };
        session.user.team = team;
      } else session.user.team = null;
      session.user.college = dbUser.college?.name || "";
      session.user.isLeader = dbUser?.isLeader;
      session.user.phone = dbUser?.phone || "";
      session.user.profileProgress = dbUser?.profileProgress;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: secrets.GOOGLE_CLIENT_ID as string,
      clientSecret: secrets.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  adapter: PrismaAdapter(prisma),
};
