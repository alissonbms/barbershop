"use client";

import { signInAction } from "@/app/_actions/signin";
import { Button } from "@/app/_components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { signInSchema } from "@/app/schema/zod-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Undo2Icon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInPage = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  const handleGoogleLoginClick = async () => {
    await signIn("google");
  };

  const handleGithubLoginClick = async () => {
    await signIn("github");
  };

  const form = useForm<z.output<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    signInAction,
    undefined,
  );

  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-barbershop bg-cover bg-center">
        <div className="flex w-[650px] flex-col items-center justify-center gap-8 rounded-xl bg-card p-10 max-sm:mb-8 max-sm:mt-4 max-sm:w-[345px]">
          <h1 className="bg-gradient-to-bl from-[#554023] to-[#C99846] bg-clip-text text-center text-3xl font-semibold leading-none text-transparent hover:bg-gradient-to-tr">
            Davies Barber Platform
          </h1>

          <Form {...form}>
            <form action={formAction} className="w-full">
              <div className="flex flex-col gap-4 pb-4">
                {state?.error?.type === "general" && (
                  <p className="my-2 text-xs font-semibold text-red-700">
                    {state?.error?.message}.
                  </p>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex flex-col gap-1">
                        <FormLabel>Email que você cadastrou:</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="bg-background"
                            {...field}
                            placeholder={"user@user.user"}
                          />
                        </FormControl>

                        {state?.errors?.email && (
                          <p className="text-xs font-semibold text-red-700">
                            {state?.errors?.email[0]}
                          </p>
                        )}
                        {state?.error?.type === "email" && (
                          <p className="text-xs font-semibold text-red-700">
                            {state?.error?.message}.
                          </p>
                        )}
                      </div>

                      <FormMessage className="max-sm:text-center" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex flex-col gap-1">
                        <FormLabel>Senha que você cadastrou:</FormLabel>

                        <FormControl>
                          <Input
                            type="password"
                            className="bg-background"
                            {...field}
                            placeholder={". . . . . . . ."}
                          />
                        </FormControl>

                        {state?.errors?.password && (
                          <p className="text-xs font-semibold text-red-700">
                            {state?.errors?.password[0]}
                          </p>
                        )}
                      </div>

                      <FormMessage className="max-sm:text-center" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-gradient-to-br from-[#554023] to-[#C99846]"
                >
                  {isPending ? "Validando os dados..." : "Fazer login"}
                </Button>
              </div>
            </form>
          </Form>

          <div className="flex w-full flex-col gap-2">
            <Button
              className="flex min-w-full items-center gap-1"
              onClick={handleGoogleLoginClick}
            >
              <Image
                src="../google.svg"
                alt="signIn with google"
                width={24}
                height={24}
              />
              <p className="text-base max-sm:text-sm">Entrar com o Google</p>
            </Button>
            <Button
              className="flex min-w-full items-center gap-1"
              onClick={handleGithubLoginClick}
            >
              <Image
                src="../github.svg"
                alt="signIn with github"
                width={24}
                height={24}
              />
              <p className="text-base max-sm:text-sm">Entrar com o Github</p>
            </Button>
            <Button
              className="flex min-w-full items-center gap-1"
              variant="outline"
              asChild
            >
              <Link href="/">
                <Undo2Icon size={24} />
                <p className="text-base max-sm:text-sm">
                  Voltar como visitante
                </p>
              </Link>
            </Button>
            <Link
              href="/auth/signup"
              className="mt-4 flex flex-col gap-0.5 text-center text-sm"
            >
              <span className="text-decoration-none cursor-default">
                Não tem uma conta ainda?
              </span>
              <span className="underline"> Cadastre-se aqui agora!</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInPage;