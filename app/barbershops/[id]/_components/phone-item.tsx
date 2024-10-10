"use client";

import { Button } from "@/app/_components/ui/button";
import { SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";

const handleCopyPhoneClick = (phone: string) => {
  navigator.clipboard.writeText(phone);
  toast.success("Número de telefone copiado com sucesso!", { duration: 1000 });
};

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={18} /> <p className="text-sm">{phone}</p>
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
