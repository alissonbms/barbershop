"use client";

import BookingDeleteButton from "@/app/_components/ui/booking-delete-button";
import BookingDetails from "@/app/_components/ui/booking-details";
import BookingItem from "@/app/_components/ui/booking-item";
import BookingPayButton from "@/app/_components/ui/booking-pay-button";
import BookingSheet from "@/app/_components/ui/booking-sheet";
import SectionTitle from "@/app/_components/ui/section-title";
import { Prisma } from "@prisma/client";
import { useState } from "react";

interface UserBookingsProps {
  confirmedBookings: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>[];
  finishedBookings: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>[];
  waitingBookings: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>[];
}

const UserBookings = ({
  confirmedBookings,
  finishedBookings,
  waitingBookings,
}: UserBookingsProps) => {
  const [selectedBooking, setSelectedBooking] = useState<{
    index: number;
    type: "waiting" | "confirmed" | "finished";
  }>({
    index: 0,
    type:
      waitingBookings.length > 0
        ? "waiting"
        : confirmedBookings.length > 0
          ? "confirmed"
          : "finished",
  });

  const handleSelectBookingClick = (
    i: number,
    type: "waiting" | "confirmed" | "finished",
  ) => {
    setSelectedBooking({
      index: i,
      type,
    });
  };

  return (
    <div className="flex gap-10 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
      <div className="md:min-w-[50%] md:max-w-[50%]">
        {waitingBookings.length > 0 && (
          <SectionTitle title="Aguardando pagamento" className="mt-6" />
        )}

        <div className="flex flex-col gap-4">
          {waitingBookings.map((booking, i) => (
            <div key={booking.id}>
              <button
                className="w-full max-md:hidden"
                onClick={() => handleSelectBookingClick(i, "waiting")}
              >
                <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
              </button>

              <div className="w-full md:hidden">
                <BookingSheet
                  style="min-w-[350px]"
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              </div>
            </div>
          ))}
        </div>

        {confirmedBookings.length > 0 && (
          <SectionTitle title="Confirmadas" className="mt-6" />
        )}
        <div className="flex flex-col gap-4">
          {confirmedBookings.map((booking, i) => (
            <div key={booking.id}>
              <button
                className="w-full max-md:hidden"
                onClick={() => handleSelectBookingClick(i, "confirmed")}
              >
                <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
              </button>
              <div className="w-full md:hidden">
                <BookingSheet
                  style="min-w-[350px]"
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              </div>
            </div>
          ))}
        </div>

        {finishedBookings.length > 0 && (
          <SectionTitle title="Finalizadas" className="mt-6" />
        )}

        <div className="flex flex-col gap-4">
          {finishedBookings.map((booking, i) => (
            <div key={booking.id}>
              <button
                className="w-full max-md:hidden"
                onClick={() => handleSelectBookingClick(i, "finished")}
              >
                <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
              </button>

              <div className="w-full md:hidden">
                <BookingSheet
                  style="min-w-[350px]"
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="sticky top-6 mt-12 hidden w-72 md:flex">
          {waitingBookings.length > 0 && selectedBooking.type === "waiting" ? (
            <div className="w-[20rem] min-w-[20rem] lg:min-w-96">
              <BookingDetails
                booking={waitingBookings[Number(selectedBooking.index)]}
              />

              <div className="mt-6 flex w-full gap-2">
                <BookingPayButton
                  booking={waitingBookings[Number(selectedBooking.index)]}
                />

                <BookingDeleteButton
                  booking={waitingBookings[Number(selectedBooking.index)]}
                />
              </div>
            </div>
          ) : confirmedBookings.length > 0 &&
            selectedBooking.type === "confirmed" ? (
            <div className="w-[20rem] min-w-[20rem] lg:min-w-96">
              <BookingDetails
                booking={confirmedBookings[Number(selectedBooking.index)]}
              />

              <div className="mt-6 w-full">
                <BookingDeleteButton
                  booking={confirmedBookings[Number(selectedBooking.index)]}
                />
              </div>
            </div>
          ) : (
            finishedBookings.length > 0 && (
              <div className="w-[20rem] min-w-[20rem] lg:min-w-96">
                <BookingDetails
                  booking={finishedBookings[Number(selectedBooking.index)]}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
