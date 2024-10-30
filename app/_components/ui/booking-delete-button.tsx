"use client";

import { deleteBooking } from "@/app/_actions/delete-booking";
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
} from "@/app/_components/ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./button";
import { BookingProps } from "@/app/_constants/booking";
import { toast } from "sonner";

interface BookingDeleteButtonProps extends BookingProps {
  setIsSheetOpen?: Dispatch<SetStateAction<boolean>>;
}

const BookingDeleteButton = ({
  booking,
  setIsSheetOpen,
}: BookingDeleteButtonProps) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking({
        bookingId: booking.id,
      });
      setIsAlertDialogOpen(false);
      setIsSheetOpen && setIsSheetOpen(false);
      toast.success("Reserva deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar a reserva. Tente novamente.");
    }
  };

  return (
    <AlertDialog
      open={isAlertDialogOpen}
      onOpenChange={(open) => setIsAlertDialogOpen(open)}
    >
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[70%] rounded-xl md:max-w-[45%] lg:max-w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá completamente a sua
            reserva.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Voltar</AlertDialogCancel>
          <AlertDialogAction asChild className="w-full">
            <Button variant="destructive" onClick={handleDeleteBooking}>
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingDeleteButton;
