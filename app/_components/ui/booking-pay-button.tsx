"use client";

import { redirect } from "next/navigation";
import { Button } from "./button";
import { createBookingCheckout } from "@/app/_actions/booking-checkout";
import getStripe from "@/app/_utils/get-stripejs";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { BookingProps } from "@/app/_types/booking";

const BookingPayButton = ({ booking }: BookingProps) => {
  const { data: session } = useSession();

  const handlePayBookingClick = async () => {
    if (!session?.user) {
      redirect("/auth/signin");
    }
    try {
      const userId = session.user.id;

      const checkout = await createBookingCheckout({
        userId,
        bookingId: booking.id,
        date: booking.date,
        service: booking.service,
        barbershopImage: booking.service.barbershop.imageUrl,
        barbershopName: booking.service.barbershop.name,
      });

      const stripePromise = await getStripe();

      stripePromise?.redirectToCheckout({
        sessionId: checkout.id,
      });
    } catch (error) {
      return toast.error("Erro ao pagar a reserva!");
    }
  };

  return (
    <Button
      className="w-full bg-green-700 hover:bg-green-600"
      onClick={handlePayBookingClick}
    >
      Pagar
    </Button>
  );
};

export default BookingPayButton;
