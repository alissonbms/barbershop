import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const type = new PrismaClient().$extends(withAccelerate());

const globalForPrisma = globalThis as unknown as { prisma: typeof type };

export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
