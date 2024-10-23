import React from "react";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import Image from "next/image";
import PhoneItem from "@/app/barbershops/[id]/_components/phone-item";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);

  const barbershop = booking.service.barbershop;
  const service = booking.service;

  return (
    <Sheet>
      <SheetTrigger className="w=full">
        <Card className="min-w-[80%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-3 py-5 pl-5">
              <Badge
                variant={"outline"}
                className={
                  isConfirmed
                    ? `w-fit bg-green-700 text-white`
                    : `hover:text-none w-fit border-secondary bg-card text-secondary hover:bg-none`
                }
              >
                {isConfirmed ? "Confirmada" : "Finalizada"}
              </Badge>
              <h2 className="font-semibold">{service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "d", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}h
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia ${barbershop.name}`}
            src={"/map.png"}
            fill
            sizes="100vw"
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            variant={"outline"}
            className={
              isConfirmed
                ? `w-fit bg-green-700 text-white`
                : `hover:text-none w-fit border-secondary bg-card text-secondary hover:bg-none`
            }
          >
            {isConfirmed ? "Confirmada" : "Finalizada"}
          </Badge>

          <Card className="mb-6 mt-3">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray_primary">Data:</p>
                <p className="text-sm">
                  <span>{format(booking.date, "d 'de' ")}</span>
                  <span className="capitalize">
                    {format(booking.date, "MMMM", {
                      locale: ptBR,
                    })}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray_primary">Horário:</p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray_primary">Barbearia:</p>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <PhoneItem phone="(15) 98775-4322" />
            <PhoneItem phone="(12) 99466-9191" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
