"use server";

import { signIn } from "@/app/_lib/auth";
import { Button } from "./button";
import Image from "next/image";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="flex w-full items-center gap-1" type="submit">
        <Image
          src="../google.svg"
          alt="login with google"
          width={18}
          height={18}
        />
        <p className="text-sm font-bold">Google</p>
      </Button>
    </form>
  );
}
