import Image from "next/image";
import BookingItem from "./_components/ui/booking-item";
import SectionTitle from "./_components/ui/section-title";
import { prisma } from "./_lib/prisma";
import BarbershopItem from "./_components/ui/barbershop-item";
import QuickSearch from "./_components/ui/quick-search";
import { auth } from "@/app/_lib/auth";
import Search from "@/app/_components/ui/search";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "@/app/_components/ui/header";

export default async function Home() {
  const session = await auth();

  const barbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

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
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col p-5 text-[#3a3a38]">
        <h2 className="text-xl font-bold">
          Olá,{" "}
          {session?.user && session.user.name
            ? session.user.name.split(" ", 1).slice(0)
            : "seja bem-vindo!"}
        </h2>

        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE', ' d", {
              locale: ptBR,
            })}
          </span>
          {" de "}
          <span className="capitalize">
            {format(new Date(), "MMMM", {
              locale: ptBR,
            })}
          </span>
        </p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="my-6">
          <QuickSearch sheet={false} />
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner-1.png"
            fill
            sizes="100vw"
            alt="agende nos melhores, atendimento excepcional, barbeiro esperando clientes"
            className="rounded-xl object-cover"
          />
        </div>

        {session?.user && confirmedBookings.length > 0 && (
          <>
            <SectionTitle title="Reservas" className="mt-6" />
            <div className="flex flex-row gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        <SectionTitle title="Recomendadas" className="mt-6" />
        <div className="flex flex-row gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {(await barbershops).map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <SectionTitle title="Populares" className="mt-6" />
        <div className="flex flex-row gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((popularBarbershop) => (
            <BarbershopItem
              key={popularBarbershop.id}
              barbershop={popularBarbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
