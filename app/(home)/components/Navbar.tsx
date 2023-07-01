"use client";
import { Avatar } from "@nextui-org/avatar";
import { usePathname } from "next/navigation";

import { ROUTES } from "./PageOptionButtons";

export default function Navbar() {
  const pathname = usePathname();

  const label = ROUTES.find(({ href }) => pathname.includes(href))?.label;

  return (
    <header className="w-full flex justify-between items-center">
      <span></span>
      <h1 className="text-xl font-bold text-center text-neutral-500">
        {label || "Chat"}
      </h1>

      <Avatar
        src="https://images.unsplash.com/photo-1688019984360-50d40dfa955a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
        size="xs"
        isBordered
        color="danger"
      />
    </header>
  );
}
