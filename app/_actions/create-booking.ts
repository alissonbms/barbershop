"use server";

import { auth } from "../_lib/auth";
import { prisma } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateBookingProps {
  serviceId: string;
  date: Date;
}

export const createBooking = async ({
  serviceId,
  date,
}: CreateBookingProps) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Usuário não autenticado!");
  }

  await prisma.booking.create({
    data: { serviceId: serviceId, date: date, userId: session?.user?.id },
  });
  revalidatePath("/barbershops/[id]");
  revalidatePath("/bookings");
};
