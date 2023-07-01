"use client";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname } from "next/navigation";

import { ROUTES } from "./PageOptionButtons";
import { useUser } from "@/hooks/useUser";
import Settings2Icon from "@/icons/Settings2Icon";

export default function Navbar() {
  const { user, logout } = useUser();

  const pathname = usePathname();

  const label = ROUTES.find(({ href }) => pathname.includes(href))?.label;

  return (
    <header className="w-full flex justify-between items-center">
      <span></span>
      <h1 className="text-xl font-bold text-center text-neutral-500">
        {label || "Chat"}
      </h1>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            imgProps={{
              referrerPolicy: "no-referrer",
            }}
            src={user?.avatar}
            size="xs"
            isBordered
            color="danger"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="text-xs">{user?.name}</p>
            <p className="text-xs font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            showDivider
            startContent={<Settings2Icon className="text-xl" />}
            className="text-xs hover:bg-orange-50 hover:text-orange-500 py-2"
          >
            My Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            showDivider
            color="danger"
            className="text-xs hover:bg-red-50 hover:text-red-500 py-2"
            onPress={logout}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
}
