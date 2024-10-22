"use client";

import { Barbershop, Booking, Service } from "@prisma/client";
import { Card, CardContent } from "../../../_components/ui/card";
import Image from "next/image";
import { Button } from "../../../_components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../_components/ui/sheet";
import { Calendar } from "../../../_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { add, format, getHours, getMinutes, isEqual, set } from "date-fns";
import { createBooking } from "@/app/_actions/create-booking";
import { useSession } from "next-auth/react";
import { getBookings } from "@/app/_actions/get-bookings";
import { toast } from "sonner";

interface ServiceItemProps {
  service: Service;
  barbershop: Pick<Barbershop, "name">;
}
const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data: session } = useSession();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
  };

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState<
    boolean | undefined
  >(false);

  const handleOpenBookingSheetChange = () => {
    setIsBookingSheetOpen(false);
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  useEffect(() => {
    if (!selectedDay) return;
    const fetch = async () => {
      const bookings = await getBookings({
        serviceId: service.id,
        date: selectedDay,
      });

      setDayBookings(bookings);
    };

    fetch();
  }, [selectedDay, service.id]);

  const getTimes = () => {
    if (!selectedDay) return;

    const opening = add(selectedDay, { hours: 9 });
    const closing = add(selectedDay, { hours: 18 });
    const interval = 30;

    const times: Date[] = [];

    for (let i = opening; i <= closing; i = add(i, { minutes: interval })) {
      if (
        !dayBookings.some(function (booking) {
          return isEqual(i, booking.date);
        })
      ) {
        times.push(i);
      }
    }

    return times;
  };

  const times = getTimes();

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;

      const minutes = getMinutes(selectedTime as Date);
      const hours = getHours(selectedTime as Date);
      const newDate = set(selectedDay as Date, {
        minutes: minutes,
        hours: hours,
      });

      await createBooking({
        serviceId: service.id,
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar a reserva!");
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray_primary">{service.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-secondary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet
              open={isBookingSheetOpen}
              onOpenChange={handleOpenBookingSheetChange}
            >
              <Button size="sm" onClick={() => setIsBookingSheetOpen(true)}>
                Reservar
              </Button>
              <SheetContent className="bg-background px-2">
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid border-gray-300 py-5">
                  <Calendar
                    fromDate={new Date()}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    mode="single"
                    locale={ptBR}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "80%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32PX",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32PX",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {times && times?.length > 0 && (
                  <div className="flex gap-2 overflow-x-scroll border-b border-solid border-gray-300 p-5 [&::-webkit-scrollbar]:hidden">
                    {times.map((time, i) => (
                      <Button
                        key={`${time}-${i}`}
                        className={`rounded-full ${selectedTime && isEqual(selectedTime, time) && `border border-secondary`}`}
                        variant={
                          selectedTime && isEqual(selectedTime, time)
                            ? "secondary"
                            : "outline"
                        }
                        onClick={() => handleTimeSelect(time)}
                      >
                        {format(time, "kk:mm")}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedDay && selectedTime && (
                  <div className="flex flex-col">
                    <div className="p-5">
                      <Card>
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
                              {format(selectedDay, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray_primary">
                              Horário:
                            </p>
                            <p className="text-sm">
                              {format(selectedTime, "HH:mm")}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray_primary">
                              Barbearia:
                            </p>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <SheetFooter className="px-5">
                      <SheetClose asChild>
                        <Button onClick={handleCreateBooking}>Reservar</Button>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
