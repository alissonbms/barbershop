"use client";

import { isFuture } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { useState } from "react";
import BookingDetails from "./booking-details";
import BookingItem from "./booking-item";
import { cn } from "@/app/_lib/utils";
import { Button } from "./button";
import BookingDeleteButton from "./booking-delete-button";
import { BookingProps } from "@/app/_types/booking";

interface BookingSheetProps extends BookingProps {
  style?: string;
}

const BookingSheet = ({ booking, style }: BookingSheetProps) => {
  const isConfirmed = isFuture(new Date(booking.date));

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
      <SheetTrigger className={cn(style)}>
        <BookingItem booking={booking} />
      </SheetTrigger>
      <SheetContent className="flex h-full w-[85%] flex-col bg-background lg:min-w-[25%]">
        <SheetDescription aria-hidden />
        <div>
          <SheetHeader>
            <SheetTitle className="mb-6 text-left">
              Informações da reserva
            </SheetTitle>
          </SheetHeader>
          <BookingDetails booking={booking} />
        </div>

        <SheetFooter className="mt-6 min-w-full">
          <div className="flex min-w-full items-center gap-2">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <BookingDeleteButton
                booking={booking}
                setIsSheetOpen={setIsSheetOpen}
              />
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
