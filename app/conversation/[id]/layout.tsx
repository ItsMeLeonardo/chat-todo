import ArrowLeftIcon from "@/icons/ArrowLeftIcon";

import User from "@/components/User";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ReactNode } from "react";
import HamburgerMenu from "@/icons/HamburgerMenu";

type Props = {
  params: {
    id: string;
  };
  children: ReactNode;
};

export default function layout({ children, params }: Props) {
  return (
    <section className="max-w-xl mx-auto h-full w-full p-2 grid place-items-center">
      <div className="flex flex-col w-full items-center gap-2 bg-white p-4 rounded-2xl h-[90%] overflow-hidden">
        <header className="w-full flex items-center justify-between py-2">
          <div className="flex gap-2 items-center">
            <Button
              as={Link}
              isIconOnly
              variant="light"
              color="danger"
              href="/home"
            >
              <ArrowLeftIcon />
            </Button>
            <User
              name={params.id}
              description="Product Designer"
              avatarProps={{
                src: "https://images.unsplash.com/photo-1688019984360-50d40dfa955a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
                isBordered: true,
                color: "secondary",
                size: "sm",
              }}
            />
          </div>
          <Button isIconOnly variant="light" className="text-2xl">
            <HamburgerMenu />
          </Button>
        </header>

        <div className="w-full h-full bg-neutral-50 p-2 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}
