import { CalendarFoldIcon, InfoIcon, MenuIcon, LogInIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Sheet, SheetTrigger } from "./sheet";
import SidebarSheet from "./sidebar-sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { LogOut } from "./logout-button";
import Search from "./search";
import { getSession } from "@/app/_actions/getSession";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface HeaderProps {
  searchBar?: boolean;
}

const Header = async ({ searchBar }: HeaderProps) => {
  const session = await getSession();

  return (
    <header>
      <Card className="w-full rounded-none">
        <CardContent className="flex h-[76px] flex-row items-center justify-between rounded-none p-5 py-0">
          <h1 className="inline-block bg-gradient-to-tl from-[#554023] to-[#C99846] bg-clip-text text-2xl font-semibold uppercase leading-none tracking-tighter text-transparent">
            <Link href="/">
              Davies <span className="font-bold">barber</span>
            </Link>
          </h1>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="bg-gradient-to-tr from-[#554023] to-[#C99846]"
                >
                  <MenuIcon size={28} />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>

          {searchBar && (
            <div className="my-6 hidden w-[30%] lg:block">
              <Search />
            </div>
          )}

          {session?.user ? (
            <div className="flex items-center gap-4 max-lg:hidden">
              <Button asChild className="flex items-center gap-2">
                <Link href="/bookings">
                  <CalendarFoldIcon size={18} /> <p>Reservas</p>
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {session.user.name?.[0].toUpperCase()}
                      </AvatarFallback>

                      {session.user.image && (
                        <AvatarImage src={session.user.image} />
                      )}
                    </Avatar>

                    <div className="flex flex-col gap-0.5">
                      <p className="font-bold">{session.user.name}</p>
                      <span className="text-xs text-gray_primary">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="rounded-xl pb-2 pt-6 max-sm:max-w-[75%] md:max-w-[45%] lg:max-w-[25%]">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      O que deseja fazer?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <LogOut />
                    <Button variant="secondary" asChild>
                      {session.user.role === "USER" ? (
                        <Link href={`/membership`}>
                          Criar uma barbearia (R$)
                        </Link>
                      ) : (
                        <Link href={`/owner/barbershop`}>
                          Gerenciar minha barbearia
                        </Link>
                      )}
                    </Button>
                  </div>
                  <DialogDescription aria-hidden />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 py-5 max-lg:hidden">
              <Button className="flex items-center gap-2" asChild>
                <Link href="/auth/signup">
                  <LogInIcon size={18} /> <p>Entrar</p>
                </Link>
              </Button>

              <Button className="flex w-full items-center justify-start gap-2">
                <InfoIcon size={18} /> <p>Sobre a Davies Barber</p>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
