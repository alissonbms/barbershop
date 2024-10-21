import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import Image from "next/image";
import { Button } from "./button";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[165px] rounded-2xl">
      <CardContent className="flex flex-col gap-2 px-1 pb-2 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            fill
            alt={barbershop.name}
            className="rounded-2xl object-cover"
          />
          <Badge
            className="absolute left-2 top-2 space-x-1 opacity-90"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p>5.0</p>
          </Badge>
        </div>

        <div className="flex flex-col gap-2 px-2">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray_primary">
            {barbershop.address}
          </p>
          <Button asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
