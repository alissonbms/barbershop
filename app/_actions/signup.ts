"use server";

import { prisma } from "../_lib/prisma";
import { saltAndHashPassword } from "../_utils/password";
import { redirect } from "next/navigation";
import { signUpSchema } from "../schema/zod-form";

export type FormState =
  | {
      errors?: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
      };
      error?: { message?: string; type?: String };
    }
  | undefined;

export async function signUpAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validationResult = signUpSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validationResult.data;

  const EmailInUse = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (EmailInUse) {
    return {
      error: {
        message: "Email já está em uso",
        type: "email",
      },
    };
  }

  const isEmailValid = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  if (!isEmailValid) {
    return {
      error: {
        message: "Email inválido",
        type: "email",
      },
    };
  }

  const hashedPassword = await saltAndHashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      error: {
        message: "Não foi possivel criar a conta",
        type: "general",
      },
    };
  }

  redirect("/auth/signin");
}
