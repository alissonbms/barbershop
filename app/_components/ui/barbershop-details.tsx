import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import Image from "next/image";
import SectionTitle from "./section-title";
import Link from "next/link";
import PhoneItem from "@/app/barbershops/[id]/_components/phone-item";
import { timelines } from "@/app/_constants/timelines";

interface BarbershopDetailsProps {
  barbershop: Barbershop;
}

const BarbershopDetails = ({ barbershop }: BarbershopDetailsProps) => {
  return (
    <div className="sticky top-5">
      <div>
        <div className="relative flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia ${barbershop.name}`}
            src={"/map.png"}
            fill
            sizes="100vw"
            priority
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full bg-background">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <Link href={`/barbershops/${barbershop.id}`}>
                  <h3 className="font-bold">{barbershop.name}</h3>
                </Link>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="border-b-4 border-solid py-5">
          <SectionTitle title="Sobre nós" />
          <p className="text-justify text-sm">{barbershop.description}</p>
        </div>
        <div className="flex flex-col gap-3 border-b-4 border-solid py-5">
          <PhoneItem phone="(15) 98775-4322" />
          <PhoneItem phone="(12) 99466-9191" />
        </div>

        {/*<div key={timeline.day + timeline.schedules} className="flex justify-between"></div> */}

        <div className="flex flex-col gap-3 border-b-4 border-solid py-5">
          {timelines.map((timeline) => (
            <div
              key={timeline.day + timeline.schedules}
              className="flex items-center justify-between"
            >
              <p className="text-sm text-gray-500">{timeline.day}</p>
              <p className="text-sm text-gray-500">{timeline.schedules}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between py-5">
          <p className="text-base">Em parceria com</p>
          <h2 className="inline-block bg-gradient-to-tl from-[#554023] to-[#C99846] bg-clip-text text-2xl font-semibold uppercase leading-none tracking-tighter text-transparent">
            <Link href="/">
              Davies <span className="font-bold">barber</span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BarbershopDetails;
