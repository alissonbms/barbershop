import { redirect } from "next/navigation";
import Header from "../_components/ui/header";
import SectionTitle from "../_components/ui/section-title";
import { auth } from "../_lib/auth";
import { prisma } from "../_lib/prisma";
import BookingItem from "../_components/ui/booking-item";
import { CalendarFoldIcon } from "lucide-react";

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
      <div className="px-5">
        <div className="flex items-center gap-2 pb-6 pt-5">
          <h1 className="text-xl font-bold">Minhas reservas</h1>
          <CalendarFoldIcon size={18} />
        </div>

        <SectionTitle title="Confirmadas" />
        <div className="flex flex-col gap-4">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <SectionTitle title="Finalizadas" className="mt-6" />
        <div className="flex flex-col gap-4">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
