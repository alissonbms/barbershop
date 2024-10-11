import { CalendarFoldIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        <div className="flex flex-col gap-0.5">
          <p className="font-bold">Davies</p>
          <span className="text-xs text-gray-700">davies@gmail.com</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b-2 border-solid p-5">
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
      <div className="flex flex-col gap-4 border-b-2 border-solid p-5">
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
