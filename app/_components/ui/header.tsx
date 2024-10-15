import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Sheet, SheetTrigger } from "./sheet";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card className="w-full">
        <CardContent className="flex flex-row items-center justify-between p-5">
          <h1 className="inline-block bg-gradient-to-tl from-[#554023] to-[#C99846] bg-clip-text text-2xl font-semibold uppercase leading-none tracking-tighter text-transparent">
            <Link href="/">
              Davies <span className="font-bold">barber</span>
            </Link>
          </h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="bg-gradient-to-tl from-[#554023] to-[#C99846]"
              >
                <MenuIcon size={28} />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
