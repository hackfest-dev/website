import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "lib/db";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			team:
				| {
						id: string;
						name: string;
						isComplete: boolean;
				  }
				| null
				| undefined;
			isLeader: boolean;
			phone: string;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: "jwt",
	},
	pages: {
		error: "/auth/error",
	},
	callbacks: {
		async redirect({ url }) {
			if (url.includes("/auth/error")) {
				url = url.replace("/auth/error", "/profile");
				url = url.replace(/\?.*/, "");
			}
			return url;
		},
		async session({ session, user }) {
			const dbUser = await prisma.user.findUnique({
				where: {
					id: user.id,
				},
				include: {
					team: true,
				},
			});
			if (!dbUser) {
				throw new Error("User not found");
			}
			session.user.id = dbUser?.id;
			if (dbUser.team?.id) {
				const team = {
					id: dbUser?.team?.id,
					name: dbUser?.team?.name,
					isComplete: dbUser?.team?.isComplete,
				};
				session.user.team = team;
			}
			session.user.team = null;
			session.user.isLeader = dbUser?.isLeader;
			session.user.phone = dbUser?.phone || "";
			return session;
		},
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],

	adapter: PrismaAdapter(prisma),
};
