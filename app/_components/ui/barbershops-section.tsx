import BarbershopItem from "./barbershop-item";
import { ScrollArea, ScrollBar } from "./scroll-area";
import SectionTitle from "./section-title";
import { prisma } from "@/app/_lib/prisma";

const BarbershopsSection = async () => {
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
    <div>
      <SectionTitle title="Recomendadas" className="mt-6" />
      <ScrollArea className="h-fit w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <SectionTitle title="Populares" className="mt-6" />
      <ScrollArea className="h-fit w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((popularBarbershop) => (
            <BarbershopItem
              key={popularBarbershop.id}
              barbershop={JSON.parse(JSON.stringify(popularBarbershop))}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BarbershopsSection;
