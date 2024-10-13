"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="absolute left-4 top-4"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon />
    </Button>
  );
};

export default BackButton;
