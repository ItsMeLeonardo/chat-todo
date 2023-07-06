"use client";
import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/dropdown";

import { Input } from "@nextui-org/input";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormProjectValues } from ".";

export default function ParticipantsSection() {
  const { register, setValue } = useFormContext<FormProjectValues>();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const { users } = useUsers();

  useEffect(() => {
    register("participants", { required: true });
  }, [register]);

  const selectedUsers = useMemo(
    () => users.filter((user) => selectedKeys.has(user.id)),
    [selectedKeys, users]
  );

  useEffect(() => {
    setValue("participants", selectedUsers);
  }, [selectedUsers, setValue]);

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-bold">Participantes</span>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <label>
            <Input
              size="xs"
              label="Participantes del proyecto"
              value={selectedUsers.map((user) => user.name).join(", ")}
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
          {users.map((user) => (
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
  );
}
