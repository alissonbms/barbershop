import React from "react";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";

const Booking = () => {
  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-3 py-5 pl-5">
          <Badge className="w-fit">Confirmado</Badge>
          <h2 className="font-semibold">Corte de cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://plus.unsplash.com/premium_photo-1677444546739-21b8aad351d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                w-6
                h-6
              />
            </Avatar>
            <p className="text-sm">Saints Barber</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm">Outubro</p>
          <p className="text-2xl">01</p>
          <p className="text-sm">20:00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Booking;
