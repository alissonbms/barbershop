import { CalendarFoldIcon, MenuIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Sheet, SheetTrigger } from "./sheet";
import SidebarSheet from "./sidebar-sheet";
import { auth } from "@/app/_lib/auth";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import SignInDialog from "./sign-in-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { LogOut } from "./logout-button";
import Search from "./search";

interface HeaderProps {
  searchBar?: boolean;
}

const Header = async ({ searchBar }: HeaderProps) => {
  const session = await auth();
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
              <Popover>
                <PopoverTrigger>
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
                </PopoverTrigger>
                <PopoverContent className="mx-auto mt-2 flex h-fit w-fit bg-background p-0">
                  <LogOut />
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 py-5 max-lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <UserIcon size={18} /> <p>Perfil</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[75%] rounded-lg">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
