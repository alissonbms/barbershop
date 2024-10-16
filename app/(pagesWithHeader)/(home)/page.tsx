import Image from "next/image";
import Booking from "../../_components/ui/booking";
import SectionTitle from "../../_components/ui/section-title";
import { prisma } from "../../_lib/prisma";
import BarbershopItem from "../../_components/ui/barbershop-item";
import QuickSearch from "../../_components/ui/quick-search";
import { auth } from "@/app/_lib/auth";
import Search from "@/app/_components/ui/search";

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

  return (
    <div className="flex flex-col">
      <div className="fle p-5 text-myGray">
        <h2 className="text-xl font-bold">
          Olá,{" "}
          {session?.user && session.user.name
            ? session.user.name.split(" ", 1).slice(0)
            : "seja bem-vindo!"}
        </h2>
        <p>Quarta-feira, 25 de setembro</p>

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
            alt="agende nos melhores, atendimento excepcional, barbeiro esperando clientes"
            className="rounded-xl object-cover"
          />
        </div>

        <SectionTitle title="Agendamentos" className="mt-6" />
        <Booking />

        <SectionTitle title="Recomendadas" className="mt-6" />
        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {(await barbershops).map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <SectionTitle title="Populares" className="mt-6" />
        <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
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
