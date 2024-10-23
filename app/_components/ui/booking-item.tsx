import React from "react";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

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

  return (
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
          <h2 className="font-semibold">{booking.service.name}</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
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
  );
};

export default BookingItem;
