import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { getUserByEmail } from "../_data/get-user-by-email";
class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      authorize: async (credentials): Promise<any> => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new CredentialsSignin("Please fill all necessary fields");
          }

          const email = credentials.email as string;
          const password = credentials.password as string;

          const user = await getUserByEmail({ email, password });

          if (!user) {
            throw new CredentialsSignin("Invalid credentials");
          }

          return user as any;
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientInitializationError ||
            error instanceof Prisma.PrismaClientUnknownRequestError
          )
            throw new InvalidLoginError(
              "System Error Occured. Please Contact Support Team",
            );
          if (error instanceof ZodError)
            throw new InvalidLoginError(error.errors[0]?.message!);
          throw error;
        }
      },
    }),
  ],
  pages: { signIn: "/auth/signin", signOut: "/" },
};
