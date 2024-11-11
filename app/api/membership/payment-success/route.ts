import { prisma } from "@/app/_lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session?.metadata?.type === "BOOKING") {
      await prisma.booking.update({
        where: {
          id: session?.metadata?.bookingId,
        },
        data: {
          status: "BOOKING_CONFIRMED",
        },
      });
    }

    if (session?.metadata?.type === "MEMBERSHIP") {
      await prisma.user.update({
        where: {
          id: session?.metadata?.userId,
        },
        data: {
          role: session?.metadata?.role as Role,
        },
      });

      await prisma.membershipTracker.create({
        data: {
          userId: session?.metadata?.userId,
          membershipId: session?.metadata?.membershipId,
          date: session?.metadata?.date,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
};
