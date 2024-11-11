"use server";

import { prisma } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "./getSession";
import { redirect } from "next/navigation";

interface CreateBookingProps {
  serviceId: string;
  date: Date;
  type: "WITH_PAYMENT" | "WITHOUT_PAYMENT";
}

export const createBooking = async ({
  serviceId,
  date,
  type,
}: CreateBookingProps) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/auth/signin");
  }

  const booking = await prisma.booking.create({
    data: {
      serviceId: serviceId,
      date: date,
      userId: user.id,
      status:
        type === "WITHOUT_PAYMENT"
          ? "BOOKING_CONFIRMED"
          : "WAITING_FOR_PAYMENT",
    },
  });

  if (type === "WITH_PAYMENT") {
    return booking;
  }

  revalidatePath("/barbershops/[id]");
  revalidatePath("/bookings");
};
