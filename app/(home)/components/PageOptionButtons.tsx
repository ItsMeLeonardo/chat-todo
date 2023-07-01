"use client";

import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";

export const ROUTES = [
  {
    href: "/projects",
    label: "Proyectos",
  },
  {
    href: "/tasks",
    label: "Mis Tareas",
  },
  {
    href: "/messages",
    label: "Mensajes",
  },
];

export default function PageOptionButtons() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center w-full">
      {ROUTES.map(({ href, label }) => (
        <Button
          key={href}
          as={NextLink}
          href={href}
          variant="light"
          fullWidth
          color={pathname.includes(href) ? "secondary" : "default"}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
