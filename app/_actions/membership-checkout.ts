"use server";

import Stripe from "stripe";
import { Membership } from "@prisma/client";

interface createMembershipCheckoutProps {
  userId: string;
  membership: Membership;
}

export const createMembershipCheckout = async ({
  userId,
  membership,
}: createMembershipCheckoutProps) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
  });

  const date = new Date().toISOString();

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.HOST_URL}/owner/barbershop`,
    cancel_url: process.env.HOST_URL,
    metadata: {
      userId,
      membershipId: membership.id,
      role: membership.role,
      date,
      type: "MEMBERSHIP",
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `Membership ${membership.name.toUpperCase()}`,
            description: membership.description,
          },
          unit_amount: Number(membership.price) * 100,
        },
        quantity: 1,
      },
    ],
  });

  return checkout;
};
