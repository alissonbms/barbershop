import { redirect } from "next/navigation";
import { db } from "@/app/_lib/prisma";
import HeroSection from "./_components/hero-section";
import { MapPinIcon, StarIcon } from "lucide-react";
import SectionTitle from "@/app/_components/ui/section-title";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    redirect("http://localhost:3000");
  }

  return (
    <div className="flex flex-col">
      <HeroSection barbershop={barbershop!} />
      <div className="flex flex-col gap-3 border-b-2 border-solid p-5">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="fill-primary text-primary" size={18} />
            <p className="text-sm">5.0 (182 avaliações)</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-solid p-5">
        <SectionTitle title="Sobre nós" />
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
    </div>
  );
};

export default BarbershopPage;
