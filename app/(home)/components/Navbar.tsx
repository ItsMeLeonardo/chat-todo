"use client";
import { Avatar } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { ROUTES } from "./PageOptionButtons";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  const pathname = usePathname();

  const label = ROUTES.find(({ href }) => pathname.includes(href))?.label;

  return (
    <header className="w-full flex justify-between items-center">
      <span></span>
      <h1 className="text-xl font-bold text-center text-neutral-500">
        {label || "Chat"}
      </h1>

      <Avatar
        imgProps={{
          referrerPolicy: "no-referrer",
        }}
        src={user?.avatar}
        size="xs"
        isBordered
        color="danger"
      />
    </header>
  );
}
