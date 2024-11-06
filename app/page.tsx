import Image from "next/image";
import QuickSearch from "./_components/ui/quick-search";
import Search from "@/app/_components/ui/search";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "@/app/_components/ui/header";
import BarbershopsSection from "./_components/ui/barbershops-section";
import BookingsSection from "./_components/ui/bookings-section";
import { getSession } from "./_actions/getSession";

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <Header />
      <div className="flex flex-col xl:mx-auto xl:max-w-[1720px]">
        <div className="flex flex-1 flex-col p-5 text-[#3a3a38]">
          <div className="xl:mt-5 xl:flex xl:gap-20">
            <div
              className={`xl:float-start xl:flex xl:min-h-full xl:flex-col ${session?.user ? `xl:min-w-[40%] 2xl:min-w-[45%]` : `xl:min-w-[55%] 2xl:min-w-[50%]`}`}
            >
              <h2 className="text-xl font-bold xl:text-2xl">
                Olá,{" "}
                {session?.user && session.user.name
                  ? session.user.name.split(" ", 1).slice(0)
                  : "seja bem-vindo!"}
              </h2>

              <p className="xl:text-xl">
                <span className="capitalize">
                  {format(new Date(), "EEEE', ' d", {
                    locale: ptBR,
                  })}
                </span>
                {" de "}
                <span className="capitalize">
                  {format(new Date(), "MMMM", {
                    locale: ptBR,
                  })}
                </span>
              </p>

              <div className="mt-6">
                <Search />
              </div>

              <div className="my-6">
                <QuickSearch sheet={false} />
              </div>

              <div className="flex-row gap-2 md:flex">
                <div className="relative h-[160px] w-full max-sm:h-[150px] md:h-[200px] xl:hidden">
                  <Image
                    src="/banner-3.png"
                    fill
                    sizes="100vw"
                    alt="agende nos melhores, atendimento excepcional, barbeiro esperando clientes"
                    className="rounded-xl object-cover md:object-contain lg:object-cover"
                  />
                </div>

                <div className="relative h-[200px] w-full max-md:hidden xl:h-[200px]">
                  <Image
                    src="/banner-2.png"
                    fill
                    sizes="100vw"
                    alt=" profissionais experientes, revisão de Davies Barber"
                    className="rounded-xl object-cover md:object-contain lg:object-cover"
                  />
                </div>
              </div>
            </div>

            <BookingsSection />
          </div>

          <BarbershopsSection />
        </div>
      </div>
    </>
  );
}
