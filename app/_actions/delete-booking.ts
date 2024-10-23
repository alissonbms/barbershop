"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

interface DeleteBookingProps {
  bookingId: string;
}

export const deleteBooking = async ({ bookingId }: DeleteBookingProps) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
  revalidatePath("/bookings");
};
