"use server";
import { endOfDay, startOfDay } from "date-fns";

import { prisma } from "../_lib/prisma";

interface getBookingsProps {
  serviceId: string;
  date: Date;
}

export const getBookings = async ({ serviceId, date }: getBookingsProps) => {
  return await prisma.booking.findMany({
    where: {
      serviceId: serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
