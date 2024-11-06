import NextAuth from "next-auth";
import { authConfig } from "./app/_lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./app/_lib/prisma";
import type { Adapter } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async jwt({ account, user, token }) {
      if (account?.provider === "credentials") {
        const sessionToken = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

        const session = await PrismaAdapter(prisma).createSession!({
          userId: user.id!,
          sessionToken,
          expires,
        });
        token.sessionId = session.sessionToken;
      }
      return token;
    },
    async session({ session }) {
      if (!session.user) return session;
      const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image,
        role: session.user.role,
      };
      session.user = user;
      return session;
    },
  },
  jwt: {
    async encode({ token }) {
      return token?.sessionId as unknown as string;
    },
  },
  events: {
    async signOut(message) {
      if ("session" in message && message.session?.sessionToken) {
        await prisma.session.deleteMany({
          where: {
            sessionToken: message.session.sessionToken,
          },
        });
      }
    },
  },
});
