"use client";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useState } from "react";

type Props = {
  message: string;
};

export default function PinnedMessage({ message }: Props) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="bg-white rounded-xl p-4 w-full shadow-3xl flex gap-2">
      <Avatar
        name="John Doe"
        src="https://i.pinimg.com/564x/f5/f5/dc/f5f5dc5e606721b50fa2c95f60c4fa4e.jpg"
      />
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
