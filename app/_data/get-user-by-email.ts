"use server";

import { compare } from "bcryptjs";
import { prisma } from "../_lib/prisma";

interface getUserByEmailProps {
  email: string;
  password: string;
}
export const getUserByEmail = async ({
  email,
  password,
}: getUserByEmailProps) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("Algo deu errado, tente novamente por favor");
  }

  const passwordMatches = await compare(password, user.password as string);

  if (passwordMatches) {
    return user;
  } else {
    return null;
  }
};
