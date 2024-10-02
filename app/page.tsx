import { SearchIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Header from "./_components/ui/header";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import Booking from "./_components/ui/booking";
import SectionTitle from "./_components/ui/section-title";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="fle p-5 text-myGray">
        <h2 className="text-xl font-bold">Olá, Davies!</h2>
        <p>Quarta-feira, 25 de setembro</p>

        <div className="mt-6 flex flex-row gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-1.png"
            fill
            alt="agende nos melhores, atendimento excepcional, barbeiro esperando clientes"
            className="rounded-xl object-cover"
          />
        </div>

        <SectionTitle title="Agendamentos" />
        <Booking />
      </div>
    </div>
  );
}
