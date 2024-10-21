"use server";

import { prisma } from "../_lib/prisma";

interface CreateBookingProps {
  userId: string;
  serviceId: string;
  date: Date;
}

export const createBooking = async (props: CreateBookingProps) => {
  return await prisma.booking.create({
    data: props,
  });
};
