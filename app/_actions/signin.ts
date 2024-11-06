import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormState } from "./signup";
import { signInSchema } from "../schema/zod-form";

export async function signInAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validationResult = signInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

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

  try {
    const user = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (!user) {
      return {
        error: {
          message: "Usuário não encontrado.",
          type: "general",
        },
      };
    }
  } catch (error) {
    return {
      error: {
        message: "Não foi possivel fazer login.",
        type: "general",
      },
    };
  } finally {
    redirect("/");
  }
}
