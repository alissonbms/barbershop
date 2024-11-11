import Image from "next/image";
import { ScrollArea, ScrollBar } from "./scroll-area";
import SectionTitle from "./section-title";
import { prisma } from "@/app/_lib/prisma";
import BookingSheet from "./booking-sheet";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/_actions/getSession";

const BookingsSection = async () => {
  const session = await getSession();

  const confirmedBookings = await prisma.booking.findMany({
    where: {
      userId: session?.user?.id,
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

  const hasTwoBookingType =
    confirmedBookings.length > 0 && waitingBookings.length > 0;

  return (
    <div className="w-full">
      <div className="w-full xl:float-end">
        {session?.user &&
        (confirmedBookings.length > 0 || waitingBookings.length > 0) ? (
          <div
            className={`flex w-full max-xl:flex-col xl:gap-4 ${!hasTwoBookingType && "justify-center"}`}
          >
            {waitingBookings.length > 0 && (
              <div
                className={`flex flex-col ${!hasTwoBookingType ? "xl:w-[30rem]" : "w-full"}`}
              >
                <SectionTitle
                  title="Aguardando pagamento"
                  className="max-xl:mt-6 lg:flex"
                />
                <ScrollArea className="h-96 w-full max-xl:h-fit">
                  <div className="flex gap-4 xl:flex-col [&::-webkit-scrollbar]:hidden">
                    {waitingBookings.map((booking) => (
                      <BookingSheet
                        style="min-w-[350px]"
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}

            {confirmedBookings.length > 0 && (
              <div
                className={`flex flex-col ${!hasTwoBookingType ? "xl:w-[30rem]" : "w-full"}`}
              >
                <SectionTitle
                  title="Reservas confirmadas"
                  className="max-xl:mt-6"
                />
                <ScrollArea className="h-96 w-full max-xl:h-fit">
                  <div className="flex gap-4 xl:flex-col [&::-webkit-scrollbar]:hidden">
                    {confirmedBookings.map((booking) => (
                      <BookingSheet
                        style="min-w-[350px]"
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>
        ) : (
          <div className="alig-center py-18 mt-6 flex h-72 w-full flex-col justify-center gap-3 px-10 xl:h-[30rem] xl:px-24">
            <h3 className="text-center max-xl:font-semibold lg:text-lg xl:text-xl">
              Assim que começar a realizar suas reservas, as mesmas aparecerão
              aqui na tela inicial :)
            </h3>
            <div className="relative h-[250px] w-full">
              <Image src="/banner-4.svg" fill alt="aa" sizes="100vw" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
