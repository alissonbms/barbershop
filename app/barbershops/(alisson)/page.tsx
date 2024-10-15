import BarbershopItem from "../../_components/ui/barbershop-item";
import Search from "../../_components/ui/search";
import SectionTitle from "../../_components/ui/section-title";
import { prisma } from "../../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await prisma.barbershop.findMany({
    where: searchParams.service
      ? {
          services: {
            some: {
              name: {
                contains: searchParams.service,
                mode: "insensitive",
              },
            },
          },
        }
      : {
          OR: [
            {
              name: {
                contains: searchParams.title,
                mode: "insensitive",
              },
            },
          ],
        },
  });

  return (
    <div className="flex flex-col px-5">
      <div className="my-6">
        <Search />
      </div>
      <SectionTitle
        title={`Resultados encontrados para ${searchParams.title ? searchParams.title : searchParams.service}`}
      />

      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopsPage;
