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
      <div className="relative h-[250px] w-full lg:h-[350px]">
        <Image
          src={barbershop!.imageUrl}
          alt={barbershop!.name}
          fill
          sizes="100vw"
          quality={100}
          className="object-contain max-lg:bg-card max-sm:object-cover lg:rounded-xl lg:object-cover lg:shadow-lg"
          priority
        />
        <div className="lg:hidden">
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
    </div>
  );
};

export default HeroSection;
