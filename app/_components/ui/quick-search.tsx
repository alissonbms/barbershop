import React from "react";
import Image from "next/image";
import { Button } from "./button";
import { quickSearchOptions } from "@/app/_constants/search";

const QuickSearch = () => {
  return (
    <div className="my-6 flex gap-2.5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((quickSearchOption) => (
        <Button
          key={quickSearchOption.title}
          variant="secondary"
          className="flex min-w-[125px] items-center gap-1.5"
        >
          <Image
            src={quickSearchOption.imageUrl}
            alt={quickSearchOption.title}
            width={16}
            height={16}
          />
          {quickSearchOption.title}
        </Button>
      ))}
    </div>
  );
};

export default QuickSearch;
