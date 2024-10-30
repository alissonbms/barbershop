import Image from "next/image";
import { ScrollArea, ScrollBar } from "./scroll-area";
import SectionTitle from "./section-title";
import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import BookingSheet from "./booking-sheet";

const BookingsSection = async () => {
  const session = await auth();

  const confirmedBookings = await prisma.booking.findMany({
    where: {
      userId: session?.user?.id,
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

  return (
    <div className="w-full">
      <div className="w-full xl:float-end">
        {session?.user && confirmedBookings.length > 0 ? (
          <div className="flex max-xl:flex-col xl:gap-4">
            <div className="flex w-full flex-col">
              <SectionTitle
                title="Reservas confirmadas"
                className="max-xl:mt-6 lg:flex"
              />
              <ScrollArea className="h-96 w-full max-xl:h-fit">
                <div className="flex gap-4 xl:flex-col [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingSheet
                      style="min-w-[350px]"
                      key={booking.id}
                      booking={booking}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="flex w-full flex-col">
              <SectionTitle
                title="Aguardando pagamento"
                className="max-xl:mt-6"
              />
              <ScrollArea className="h-96 w-full max-xl:h-fit">
                <div className="flex gap-4 xl:flex-col [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingSheet
                      style="min-w-[350px]"
                      key={booking.id}
                      booking={booking}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
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
