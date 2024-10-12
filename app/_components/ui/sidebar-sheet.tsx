import {
  CalendarFoldIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const SidebarSheet = () => {
  const user = false;
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {user ? (
        <div className="flex items-center gap-3 border-b border-solid border-gray-300 py-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <p className="font-bold">Davies</p>
            <span className="text-xs text-gray-700">davies@gmail.com</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-solid border-gray-300 py-5">
          <h2 className="py-2 text-lg font-bold">Olá, faça seu login!</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] rounded-lg">
              <DialogHeader>
                <DialogTitle>Fazer login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>
              <Button className="flex items-center gap-1">
                <Image
                  src="../google.svg"
                  alt="login with google"
                  width={18}
                  height={18}
                />
                <p className="text-sm font-bold">Google</p>
              </Button>
            </DialogContent>
          </Dialog>
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

        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 hover:bg-inherit hover:text-secondary"
        >
          <CalendarFoldIcon size={18} /> <p>Agendamentos</p>
        </Button>
      </div>
      <div className="flex flex-col gap-4 border-b border-solid border-gray-300 p-5">
        {quickSearchOptions.map((quickSearchOption, index) => (
          <Button
            variant="ghost"
            key={quickSearchOption.title + index}
            className="flex w-full items-center justify-start gap-2 hover:bg-inherit hover:text-secondary"
          >
            <div className="fill-primary text-primary"></div>
            <Image
              src={quickSearchOption.blackImageUrl}
              alt={quickSearchOption.title}
              width={18}
              height={18}
            />
            <p>{quickSearchOption.title}</p>
          </Button>
        ))}
      </div>

      <div className="flex p-5">
        <Button
          variant="secondary"
          className="flex w-full items-center justify-start gap-2"
        >
          <LogOutIcon size={18} /> <p>Sair da conta</p>
        </Button>
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
