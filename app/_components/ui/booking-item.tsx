"use client";

import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { format, isFuture } from "date-fns";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import { Prisma } from "@prisma/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PhoneItem from "@/app/barbershops/[id]/_components/phone-item";
import { Button } from "./button";
import { toast } from "sonner";
import { deleteBooking } from "@/app/_actions/delete-booking";
import { useState } from "react";

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

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking({
        bookingId: booking.id,
      });
      setIsAlertDialogOpen(false);
      setIsSheetOpen(false);
      toast.success("Reserva deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar a reserva. Tente novamente.");
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
      <SheetTrigger className="w-full min-w-[80%]">
        <Card className="min-w-[80%]">
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
      </SheetTrigger>
      <SheetContent className="flex h-full w-[85%] flex-col bg-background">
        <div className="flex-1">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da reserva
            </SheetTitle>
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

        <SheetFooter>
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={(open) => setIsAlertDialogOpen(open)}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Deletar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[80%] rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      completamente a sua reserva.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteBooking}
                      >
                        Deletar
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
