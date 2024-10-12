import { SearchIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import Image from "next/image";
import Booking from "../../_components/ui/booking";
import SectionTitle from "../../_components/ui/section-title";
import { prisma } from "../../_lib/prisma";
import BarbershopItem from "../../_components/ui/barbershop-item";
import QuickSearch from "../../_components/ui/quick-search";

export default async function Home() {
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
        <h2 className="text-xl font-bold">Olá, Davies!</h2>
        <p>Quarta-feira, 25 de setembro</p>

        <div className="mt-6 flex flex-row gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <QuickSearch />

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
