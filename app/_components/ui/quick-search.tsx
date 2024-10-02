import React from "react";
import Image from "next/image";
import { Button } from "./button";

const QuickSearch = () => {
  return (
    <div className="my-6 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      <Button className="flex min-w-[125px] gap-2" variant="secondary">
        <Image
          src="/cabelo.svg"
          alt="procurar serviços para o cabelo "
          width={16}
          height={16}
        />
        Cabelo
      </Button>

      <Button className="flex min-w-[125px] gap-2" variant="secondary">
        <Image
          src="/barba.svg"
          alt="procurar serviços para a barba "
          width={16}
          height={16}
        />
        Barba
      </Button>

      <Button className="flex min-w-[125px] gap-2" variant="secondary">
        <Image
          src="/acabamento.svg"
          alt="procurar serviços de acabamento "
          width={16}
          height={16}
        />
        Acabamento
      </Button>

      <Button className="flex min-w-[125px] gap-2" variant="secondary">
        <Image
          src="/barba.svg"
          alt="procurar serviços para a barba "
          width={16}
          height={16}
        />
        Pezinho
      </Button>

      <Button className="flex min-w-[125px] gap-2" variant="secondary">
        <Image
          src="/acabamento.svg"
          alt="procurar serviços de acabamento "
          width={16}
          height={16}
        />
        Sobrancelha
      </Button>
    </div>
  );
};

export default QuickSearch;
