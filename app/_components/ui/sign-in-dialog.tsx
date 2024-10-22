"use client";

import Image from "next/image";
import { Button } from "./button";
import { DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleGoogleLoginClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Fazer login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>
      <Button
        className="flex w-full items-center gap-1"
        onClick={handleGoogleLoginClick}
      >
        <Image
          src="../google.svg"
          alt="login with google"
          width={18}
          height={18}
        />
        <p className="text-sm font-bold">Google</p>
      </Button>
    </>
  );
};

export default SignInDialog;
