import { redirect } from "next/navigation";
import Header from "../_components/ui/header";
import { prisma } from "../_lib/prisma";
import { CalendarFoldIcon } from "lucide-react";
import UserBookings from "./components/user-bookings";
import { getSession } from "../_actions/getSession";

const BookingsPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/auth/signin");
  }

  const confirmedBookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      status: "BOOKING_CONFIRMED",

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

  const waitingBookings = await prisma.booking.findMany({
    where: {
      userId: session?.user?.id,
      status: "WAITING_FOR_PAYMENT",
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
      userId: user.id,
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

  if (user) {
    return (
      <>
        <Header searchBar={true} />
        <div className="w-full px-5 lg:mx-auto lg:max-w-[1000px]">
          <div className="flex items-center gap-2 pt-5 max-md:justify-center">
            <h1 className="text-xl font-bold">Minhas reservas</h1>
            <CalendarFoldIcon size={18} />
          </div>
          {!finishedBookings.length &&
            !confirmedBookings.length &&
            !waitingBookings.length && (
              <p className="mt-4 text-lg max-md:text-center">
                Você ainda não realizou nenhuma reserva...
              </p>
            )}

          <UserBookings
            finishedBookings={JSON.parse(JSON.stringify(finishedBookings))}
            waitingBookings={JSON.parse(JSON.stringify(waitingBookings))}
            confirmedBookings={JSON.parse(JSON.stringify(confirmedBookings))}
          />
        </div>
      </>
    );
  }
  return <h1>loading</h1>;
};

export default BookingsPage;
