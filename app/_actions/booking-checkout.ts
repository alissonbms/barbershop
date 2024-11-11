"use server";

import Stripe from "stripe";
import { Service } from "@prisma/client";
import { format } from "date-fns";

interface createBookingCheckoutProps {
  userId: string;
  bookingId: string;
  service: Service;
  date: Date;
  barbershopImage: string;
  barbershopName: string;
}

export const createBookingCheckout = async ({
  userId,
  bookingId,
  service,
  date,
  barbershopImage,
  barbershopName,
}: createBookingCheckoutProps) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
  });

  const pictures = [barbershopImage];
  const dateTime = format(date, "HH:mm");

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.HOST_URL}/bookings`,
    cancel_url: `${process.env.HOST_URL}/bookings`,
    metadata: {
      userId,
      bookingId,
      type: "BOOKING",
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `Reserva para ${service.name} na ${barbershopName}`,
            description: `Lembre-se o horário marcado é ${dateTime}h, no mais, aproveite, pois aqui a satisfação é garantida! `,
            images: pictures,
          },
          unit_amount: Number(service.price) * 100,
        },
        quantity: 1,
      },
    ],
  });

  return checkout;
};
