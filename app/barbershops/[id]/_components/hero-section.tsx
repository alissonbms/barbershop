"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";

interface HeroSectionProps {
  barbershop: Barbershop;
}

const HeroSection = ({ barbershop }: HeroSectionProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop!.imageUrl}
          alt={barbershop!.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          className="absolute left-4 top-4"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
        <Button size="icon" className="absolute right-4 top-4">
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
