"use client";

import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { format, isFuture } from "date-fns";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import PhoneItem from "@/app/barbershops/[id]/_components/phone-item";
import { BookingProps } from "@/app/_types/booking";
import Link from "next/link";

const BookingDetails = ({ booking }: BookingProps) => {
  const isConfirmed = isFuture(booking.date);
  const barbershop = booking.service.barbershop;
  const service = booking.service;

  return (
    <div>
      <div className="relative flex h-[180px] w-full items-end">
        <Image
          alt={`Mapa da barbearia ${barbershop.name}`}
          src={"/map.png"}
          fill
          sizes="100vw"
          priority
          className="rounded-xl object-cover"
        />

        <Card className="z-50 mx-5 mb-3 w-full">
          <CardContent className="flex items-center gap-3 px-5 py-3">
            <Avatar>
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>
            <div>
              <Link href={`/barbershops/${barbershop.id}`}>
                <h3 className="font-bold">{barbershop.name}</h3>
              </Link>
              <p className="text-xs">{barbershop.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Badge
          variant={isConfirmed ? "default" : "outline"}
          className={
            isConfirmed
              ? `w-fit bg-green-700`
              : `w-fit border-secondary text-secondary`
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
    </div>
  );
};

export default BookingDetails;
