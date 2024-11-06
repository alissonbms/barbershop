import { CalendarFoldIcon, HomeIcon, InfoIcon, LogInIcon } from "lucide-react";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import Link from "next/link";
import { Button } from "./button";
import { LogOut } from "./logout-button";
import QuickSearch from "./quick-search";
import { getSession } from "@/app/_actions/getSession";
import { redirect } from "next/navigation";

const SidebarSheet = async () => {
  const session = await getSession();

  return (
    <SheetContent className="overflow-y-auto bg-background">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <SheetDescription aria-hidden />

      {session?.user ? (
        <div className="flex items-center gap-3 border-b border-solid border-gray-300 py-5">
          <Avatar>
            <AvatarFallback>
              {session.user.name?.[0].toUpperCase()}
            </AvatarFallback>

            {session.user.image && <AvatarImage src={session.user.image} />}
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <p className="font-bold">{session.user.name}</p>
            <span className="text-xs text-gray_primary">
              {session.user.email}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-solid border-gray-300 py-5">
          <h2 className="py-2 text-lg font-bold">Olá, entre na plataforma!</h2>

          <Button size="icon" asChild>
            <Link href="/auth/signup">
              <LogInIcon />
            </Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4 border-b border-solid border-gray-300 p-5">
        <SheetClose asChild>
          <Button
            variant="secondary"
            className="flex items-center justify-start gap-2"
            asChild
          >
            <Link href="/">
              <HomeIcon size={18} /> <p>Início</p>
            </Link>
          </Button>
        </SheetClose>
        {session?.user && (
          <Button
            asChild
            variant="ghost"
            className="flex items-center justify-start gap-2 hover:bg-inherit hover:text-secondary"
          >
            <Link href="/bookings">
              <CalendarFoldIcon size={18} /> <p>Reservas</p>
            </Link>
          </Button>
        )}
      </div>

      <QuickSearch sheet={true} />

      {session?.user ? (
        <div className="flex flex-col gap-4 p-5">
          <div className="w-full border-t border-solid border-gray-300 pt-5">
            <LogOut />
          </div>
          <div className="">
            <Button
              variant="secondary"
              asChild
              className="w-full max-sm:text-xs max-sm:font-bold"
            >
              <Link href={`/owner/license`}>Criar uma barbearia (R$)</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex border-t border-solid border-gray-300 p-5">
          <Button
            variant="secondary"
            className="flex w-full items-center justify-start gap-2 max-sm:text-xs max-sm:font-bold"
          >
            <InfoIcon size={18} /> <p>Sobre a Davies Barber</p>
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default SidebarSheet;
