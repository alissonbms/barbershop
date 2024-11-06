"use server";

import { prisma } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "./getSession";
import { redirect } from "next/navigation";

interface CreateBookingProps {
  serviceId: string;
  date: Date;
}

export const createBooking = async ({
  serviceId,
  date,
}: CreateBookingProps) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/auth/signin");
  }

  await prisma.booking.create({
    data: { serviceId: serviceId, date: date, userId: user.id },
  });
  revalidatePath("/barbershops/[id]");
  revalidatePath("/bookings");
};
