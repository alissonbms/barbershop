import { notFound } from "next/navigation";
import { prisma } from "@/app/_lib/prisma";
import HeroSection from "./_components/hero-section";
import { MapPinIcon, StarIcon } from "lucide-react";
import SectionTitle from "@/app/_components/ui/section-title";
import ServiceItem from "@/app/barbershops/[id]/_components/service-item";
import PhoneItem from "./_components/phone-item";
import Header from "@/app/_components/ui/header";
import BarbershopDetails from "@/app/_components/ui/barbershop-details";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header searchBar={true} />
      </div>
      <div className="flex lg:mx-auto lg:max-w-[1200px] lg:gap-10 lg:p-5">
        <div className="flex-1 lg:float-start lg:min-w-[45%]">
          <HeroSection barbershop={JSON.parse(JSON.stringify(barbershop))!} />
          <div className="flex flex-col gap-3 max-lg:border-b-2 max-lg:border-solid max-lg:p-5 lg:mt-6">
            <div className="flex flex-col gap-1 lg:flex-row lg:justify-between">
              <div className="flex flex-col gap-2 max-lg:text-center lg:gap-6">
                <h1 className="text-xl font-bold lg:text-2xl">
                  {barbershop.name}
                </h1>
                <div className="flex items-center gap-1 max-lg:justify-center">
                  <MapPinIcon className="h-[18px] w-[18px] text-primary lg:h-[24px] lg:w-[24px]" />
                  <p className="text-sm lg:text-base">{barbershop.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 max-lg:justify-center lg:flex-col lg:rounded-2xl lg:p-5">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-[18px] w-[18px] fill-primary text-primary lg:h-[24px] lg:w-[24px]" />
                  <p className="text-sm lg:text-lg">5.0</p>
                </div>

                <p className="text-sm lg:text-base">(182 avaliações)</p>
              </div>
            </div>
          </div>

          <div className="border-b-2 border-solid p-5 lg:hidden">
            <SectionTitle title="Sobre nós" />
            <p className="text-justify text-sm">{barbershop.description}</p>
          </div>

          <div className="flex flex-col max-lg:border-b-2 max-lg:border-solid max-lg:p-5 lg:my-6">
            <SectionTitle title="Serviços" />
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={JSON.parse(JSON.stringify(service))}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                />
              ))}
            </div>
          </div>

          <div className="p-5 lg:hidden">
            <SectionTitle title="Contatos" className="lg:text-base" />

            <div className="flex flex-col gap-3">
              <PhoneItem phone="(15) 98775-4322" />
              <PhoneItem phone="(12) 99466-9191" />
            </div>
          </div>
        </div>
        <div className="float-end hidden min-h-full min-w-[35%] max-w-[35%] lg:block">
          <BarbershopDetails
            barbershop={JSON.parse(JSON.stringify(barbershop))}
          />
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
