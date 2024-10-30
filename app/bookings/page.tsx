import { redirect } from "next/navigation";
import Header from "../_components/ui/header";
import { auth } from "../_lib/auth";
import { prisma } from "../_lib/prisma";
import { CalendarFoldIcon } from "lucide-react";
import UserBookings from "./components/user-bookings";

const BookingsPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const confirmedBookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const finishedBookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return (
    <>
      <Header />
      <div className="w-full px-5 lg:mx-auto lg:max-w-[1000px]">
        <div className="flex items-center gap-2 pt-5 max-md:justify-center">
          <h1 className="text-xl font-bold">Minhas reservas</h1>
          <CalendarFoldIcon size={18} />
        </div>

        <UserBookings
          finishedBookings={finishedBookings}
          confirmedBookings={confirmedBookings}
        />
      </div>
    </>
  );
};

export default BookingsPage;
