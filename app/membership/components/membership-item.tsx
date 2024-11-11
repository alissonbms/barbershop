"use client";

import { Membership } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import getStripe from "@/app/_utils/get-stripejs";
import { createMembershipCheckout } from "@/app/_actions/membership-checkout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { BadgeCheckIcon } from "lucide-react";

export interface MembershipItemProps {
  membership: Membership;
  premium?: boolean;
}

const MembershipItem = ({ membership, premium }: MembershipItemProps) => {
  const { data: session } = useSession();

  const handleFinishPurchaseClick = async () => {
    if (!session?.user) {
      redirect("/auth/signin");
    }

    const userId = session.user.id;

    const checkout = await createMembershipCheckout({
      membership,
      userId,
    });

    const stripePromise = await getStripe();

    stripePromise?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <Card
      key={membership.id}
      className={`flex min-h-[428px] max-w-[340px] flex-col rounded-3xl p-0 ${premium && "min-h-[500px] max-w-[370px] border-primary"}`}
    >
      <CardContent className="flex flex-col gap-8 p-0">
        <div className="min-h-full">
          <CardHeader
            className={` ${premium && "rounded-t-3xl bg-gradient-to-tl from-[#554023] to-[#C99846] p-4 text-center uppercase text-white"}`}
          >
            <CardTitle className="text-center text-xl font-bold">
              {membership.name}
            </CardTitle>
          </CardHeader>

          <div className="flex flex-col p-8">
            <div className="flex flex-col gap-6">
              <p className="text-center text-5xl font-semibold text-secondary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(membership.price))}
              </p>

              <div className="flex flex-col gap-4 text-center">
                <p className="text-sm text-gray_primary">
                  {membership.description}
                </p>
              </div>
            </div>
            <ul className="m-auto mt-10 flex w-full flex-col items-center gap-4">
              {membership.advantages.map((advantage, i) => (
                <li key={i} className="flex w-full items-center gap-2">
                  <BadgeCheckIcon
                    className={`fill-primary text-white ${advantage !== "" ? "block" : "hidden"}`}
                  />
                  <span className="font-bold text-secondary">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex h-full flex-1 items-end">
        <Button className="w-full" onClick={handleFinishPurchaseClick}>
          Adquirir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipItem;
