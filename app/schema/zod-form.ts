import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório.")
    .email(
      "Email inválido, por favor tente novamente, se persistir o erro, tente usar outro.",
    ),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, "A senha é obrigatória.")
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres.",
    })
    .max(20, {
      message: "A senha deve ter no máximo 20 caractereres.",
    }),
});

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, {
      message: "Seu nome é obrigatório.",
    })
    .max(20, {
      message: "Nome deve ter no máximo 20 caracteres.",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email é obrigatório.")
    .email(
      "Email inválido, por favor tente novamente, se persistir o erro, tente usar outro.",
    ),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, {
      message: "A senha é obrigatória.",
    })
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres.",
    })
    .max(20, {
      message: "A senha deve ter no máximo 20 caractereres.",
    }),
});
