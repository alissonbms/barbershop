import React from "react";
import { Card, CardContent } from "./card";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none border-0 text-center">
        <CardContent className="py-4">
          <p className="text-sm">
            © 2023 Copyright{" "}
            <Link href="/">
              <span className="inline-block bg-gradient-to-tl from-[#554023] to-[#C99846] bg-clip-text font-semibold uppercase leading-none tracking-tighter text-transparent">
                Davies <span className="font-bold">barber</span>
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
