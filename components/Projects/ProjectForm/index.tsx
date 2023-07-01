"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { Input, Textarea } from "@nextui-org/input";
import { useMemo, useState } from "react";
import TaskSections from "./TaskSections";
import { Button } from "@nextui-org/button";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import Link from "next/link";

const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "jhon@gamil.com",
    avatar:
      "https://i.pinimg.com/236x/de/53/56/de53563d67a76a28c949b0b071e0a7d7.jpg",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "nan@gamil.com",
    avatar:
      "https://i.pinimg.com/236x/af/ed/6e/afed6eece7c7cef5ce5ad1e550d0f89f.jpg",
  },
  {
    id: "3",
    name: "Anna Doe",
    email: "jhon@gamil.com",
    avatar:
      "https://i.pinimg.com/236x/5d/f0/c7/5df0c7a50ec93e44a17f6b3e43107200.jpg",
  },
];

export default function ProjectForm() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const selectedUsers = useMemo(
    () =>
      USERS.filter((user) => selectedKeys.has(user.id))
        .map((user) => user.name)
        .join(", "),
    [selectedKeys]
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <header className="flex justify-center py-2 items-center w-full relative">
        <Button
          isIconOnly
          className="absolute top-0 left-0"
          href="/projects"
          variant="light"
          color="default"
          as={Link}
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="text-sm text-center font-bold">Project</h1>
      </header>

      <Input size="xs" label="Nombre del proyecto" />
      <Textarea
        size="xs"
        minRows={1}
        maxRows={3}
        label="Descripción del proyecto"
      />

      <div className="w-full flex flex-col gap-2">
        <span className="text-xs font-bold">Participantes</span>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <label>
              <Input
                size="xs"
                label="Participantes del proyecto"
                value={selectedUsers}
              />
            </label>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection actions"
            variant="flat"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            //@ts-ignore
            onSelectionChange={setSelectedKeys}
          >
            {USERS.map((user) => (
              <DropdownItem
                key={user.id}
                description={user.email}
                startContent={
                  <Avatar
                    src={user.avatar}
                    color="secondary"
                    size="xs"
                    className="min-w-[28px]"
                    isBordered
                  />
                }
              >
                <span className="text-xs font-bold">{user.name}</span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <TaskSections />

      <footer className="sticky bottom-2 w-full ">
        <Button color="secondary" fullWidth>
          Guardar
        </Button>
      </footer>
    </div>
  );
}
