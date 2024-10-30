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
} from "../../../_components/ui/sheet";
import { Calendar } from "../../../_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
  add,
  format,
  getHours,
  getMinutes,
  isAfter,
  isEqual,
  isFuture,
  isSaturday,
  isSunday,
  isToday,
  set,
} from "date-fns";
import { createBooking } from "@/app/_actions/create-booking";
import { getBookings } from "@/app/_actions/get-bookings";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import SignInDialog from "@/app/_components/ui/sign-in-dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";

interface ServiceItemProps {
  service: Service;
  barbershop: Pick<Barbershop, "name">;
}

interface GetTimesProps {
  dayBookings: Booking[];
  selectedDay: Date;
}

const getTimes = ({ selectedDay, dayBookings }: GetTimesProps) => {
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
      if (
        isToday(selectedDay)
          ? isAfter(i, new Date()) && times.push(i)
          : isFuture(selectedDay) && times.push(i)
      ) {
      }
    }
  }

  return times;
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const isClosedInSaturday = true;
  const isClosedInSunday = true;
  const { data: session } = useSession();
  const router = useRouter();

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

  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState<
    boolean | undefined
  >(false);

  const handleOpenBookingSheetChange = () => {
    setIsBookingSheetOpen(false);
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
  };

  const handleBookingClick = () => {
    if (session?.user) {
      return setIsBookingSheetOpen(true);
    }
    return setIsSignInDialogOpen(true);
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
      return router.push("/");
    } catch (error) {
      return toast.error("Erro ao criar a reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return getTimes({
      dayBookings,
      selectedDay,
    });
  }, [dayBookings, selectedDay]);

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              sizes="100vw"
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
                <Button size="sm" onClick={handleBookingClick}>
                  Reservar
                </Button>
                <SheetContent className="bg-background px-2">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="min-w-full border-b border-solid border-gray-300 py-5">
                    <Calendar
                      className="flex h-full w-full"
                      classNames={{
                        months:
                          "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                        month: "space-y-4 w-full flex flex-col",
                        table: "w-full h-full border-collapse space-y-1",
                        head_row: "",
                        row: "w-full mt-2",
                      }}
                      fromDate={new Date()}
                      selected={selectedDay}
                      disabled={(date) =>
                        (isClosedInSaturday && isSaturday(date)) ||
                        (isClosedInSunday && isSunday(date))
                      }
                      onSelect={handleDateSelect}
                      mode="single"
                      locale={ptBR}
                      styles={{
                        head_cell: {
                          textTransform: "capitalize",
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

                  <ScrollArea className="h-fit w-full">
                    <div className="flex gap-2 overflow-x-auto border-b border-solid border-gray-300 p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList && timeList?.length > 0 ? (
                        timeList.map((time, i) => (
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
                        ))
                      ) : (
                        <p className="text-center text-sm">
                          Não há horários disponíveis para esse dia
                        </p>
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>

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
                                <span>{format(selectedDay, "d 'de' ")}</span>
                                <span className="capitalize">
                                  {format(selectedDay, "MMMM", {
                                    locale: ptBR,
                                  })}
                                </span>
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
                          <Button
                            className="w-full"
                            onClick={handleCreateBooking}
                          >
                            Reservar
                          </Button>
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

      <Dialog
        open={isSignInDialogOpen}
        onOpenChange={(open) => setIsSignInDialogOpen(open)}
      >
        <DialogContent className="w-[75%] rounded-lg">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
