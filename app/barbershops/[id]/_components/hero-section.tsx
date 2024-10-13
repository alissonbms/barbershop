import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import SidebarSheet from "@/app/_components/ui/sidebar-sheet";
import BackButton from "./back-button";

interface HeroSectionProps {
  barbershop: Barbershop;
}

const HeroSection = ({ barbershop }: HeroSectionProps) => {
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop!.imageUrl}
          alt={barbershop!.name}
          fill
          className="object-cover"
        />

        <BackButton />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="absolute right-4 top-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>
    </div>
  );
};

export default HeroSection;
