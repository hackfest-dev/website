import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./db";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function userInfo() {
  const user = await prisma.user.findFirst({
    where: {
      email: (await getCurrentUser())?.email,
    },
  });
  return user;
}
