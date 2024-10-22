"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";

export function LogOut() {
  const handleLogoutClick = () => signOut();
  return (
    <div className="flex border-t border-solid border-gray-300 px-5 pt-5">
      <Button
        variant="secondary"
        className="flex w-full items-center justify-start gap-2"
        onClick={handleLogoutClick}
      >
        <LogOutIcon size={18} /> <p>Sair da conta</p>
      </Button>
    </div>
  );
}
