"use server";

import { auth } from "../_lib/auth";
import { prisma } from "../_lib/prisma";

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

  return await prisma.booking.create({
    data: { serviceId: serviceId, date: date, userId: session?.user?.id },
  });
};
