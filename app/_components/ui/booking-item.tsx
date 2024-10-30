import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { format, isFuture } from "date-fns";
import { BookingProps } from "@/app/_types/booking";

const BookingItem = ({ booking }: BookingProps) => {
  const isConfirmed = isFuture(booking.date);
  const barbershop = booking.service.barbershop;
  const service = booking.service;

  return (
    <Card className="min-w-[300px]">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-3 py-5 pl-5">
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
          <div className="flex">
            <h3 className="font-semibold">{service.name}</h3>
          </div>
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
  );
};

export default BookingItem;
