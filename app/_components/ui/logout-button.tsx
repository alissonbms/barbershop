"use server";

import { signOut } from "@/app/_lib/auth";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";

export async function LogOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <div className="flex border-t border-solid border-gray-300 px-5 pt-5">
        <Button
          type="submit"
          variant="secondary"
          className="flex w-full items-center justify-start gap-2"
        >
          <LogOutIcon size={18} /> <p>Sair da conta</p>
        </Button>
      </div>
    </form>
  );
}
