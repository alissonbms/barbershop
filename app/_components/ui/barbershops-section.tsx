import BarbershopItem from "./barbershop-item";
import { ScrollArea, ScrollBar } from "./scroll-area";
import SectionTitle from "./section-title";
import { prisma } from "@/app/_lib/prisma";

const BarbershopsSection = async () => {
  const barbershops_payment_on_location = await prisma.barbershop.findMany({
    where: {
      paymentMethod: "ON_LOCATION",
    },
  });
  const barbershops_payment_in_advance = await prisma.barbershop.findMany({
    where: {
      paymentMethod: "IN_ADVANCE",
    },
  });

  return (
    <div>
      <SectionTitle title="Barbearias que recebem no local" className="mt-6" />
      <ScrollArea className="h-fit w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden">
          {barbershops_payment_on_location.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <SectionTitle
        title="Barbearias que cobram antecipadamente"
        className="mt-6"
      />
      <ScrollArea className="h-fit w-full">
        <div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden">
          {barbershops_payment_in_advance.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BarbershopsSection;
