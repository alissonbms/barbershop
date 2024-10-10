import { redirect } from "next/navigation";
import { db } from "@/app/_lib/prisma";
import HeroSection from "./_components/hero-section";
import { MapPinIcon, StarIcon } from "lucide-react";
import SectionTitle from "@/app/_components/ui/section-title";
import ServiceItem from "@/app/_components/ui/service-item";
import PhoneItem from "./_components/phone-item";

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
    include: {
      services: true,
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

      <div className="flex flex-col border-b-2 border-solid p-5">
        <SectionTitle title="Serviços" />
        <div className="flex flex-col gap-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="p-5">
        <SectionTitle title="Contatos" />

        <div className="flex flex-col gap-3">
          <PhoneItem phone="(15) 98775-4322" />
          <PhoneItem phone="(12) 99466-9191" />
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
