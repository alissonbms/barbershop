"use server";
import { endOfDay, startOfDay } from "date-fns";

import { prisma } from "../_lib/prisma";

interface getBookingsProps {
  serviceId: string;
  date: Date;
}

export const getBookings = ({ serviceId, date }: getBookingsProps) => {
  return prisma.booking.findMany({
    where: {
      serviceId: serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
