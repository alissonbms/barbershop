"use client";

import Image from "next/image";
import { Button } from "./button";
import { quickSearchOptions } from "@/app/_constants/search";
import { useRouter } from "next/navigation";
import { SheetClose } from "./sheet";

interface QuickSearchProps {
  sheet: boolean;
}

const QuickSearch = ({ sheet }: QuickSearchProps) => {
  const router = useRouter();

  return (
    <>
      {sheet ? (
        <div className="flex flex-col gap-4 p-5">
          {quickSearchOptions.map((quickSearchOption) => (
            <SheetClose key={quickSearchOption.title} asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2 hover:bg-inherit hover:text-secondary"
                onClick={() =>
                  router.push(
                    `/barbershops/?service=${quickSearchOption.title}`,
                  )
                }
              >
                <Image
                  src={quickSearchOption.blackImageUrl}
                  alt={quickSearchOption.title}
                  width={18}
                  height={18}
                />
                {quickSearchOption.title}
              </Button>
            </SheetClose>
          ))}
        </div>
      ) : (
        <div className="gap-2.5 max-xl:flex max-xl:overflow-x-auto xl:grid xl:grid-cols-3 max-xl:[&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((quickSearchOption) => (
            <Button
              key={quickSearchOption.title}
              variant="secondary"
              className="flex w-full items-center gap-1.5 px-5 xl:py-5"
              onClick={() =>
                router.push(`/barbershops/?service=${quickSearchOption.title}`)
              }
            >
              <Image
                src={quickSearchOption.whiteImageUrl}
                alt={quickSearchOption.title}
                width={18}
                height={18}
              />
              {quickSearchOption.title}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default QuickSearch;
