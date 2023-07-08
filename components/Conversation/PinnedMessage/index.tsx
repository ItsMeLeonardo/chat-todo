"use client";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";

type Props = {
  message: string;
};

export default function PinnedMessage({ message }: Props) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="bg-white rounded-xl p-2 px-4 justify-between w-full shadow-3xl flex gap-2 items-center">
      <p className="text-xs max-w-[80%] overflow-hidden line-clamp-3">
        {message}
      </p>
      <Button
        isIconOnly
        variant="light"
        className="text-xl"
        aria-label="Ocultar mensaje fijado"
        onPress={() => setShow(false)}
      >
        <EyeSlashIcon />
      </Button>
    </div>
  );
}
