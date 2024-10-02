import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

const Header = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <h1 className="inline-block bg-gradient-to-tl from-[#554023] to-[#C99846] bg-clip-text text-2xl font-semibold uppercase leading-none tracking-tighter text-transparent">
          Davies <span className="font-bold">barber</span>
        </h1>
        <Button
          size="icon"
          className="bg-gradient-to-tl from-[#554023] to-[#C99846]"
        >
          <MenuIcon size={28} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
