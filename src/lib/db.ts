import { PrismaClient } from "@prisma/client";
import { secrets } from "./secrets";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: secrets.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (secrets.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
