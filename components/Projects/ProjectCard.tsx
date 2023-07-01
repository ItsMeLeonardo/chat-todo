"use client";

import Folder2Icon from "@/icons/Folder2Icon";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Progress } from "@nextui-org/react";
import Link from "next/link";

const getRandomGradient = () => {
  const gradients = [
    "from-pink-500 to-yellow-500",
    "from-purple-500 to-indigo-500",
    "from-green-500 to-cyan-500",
    "from-yellow-500 to-orange-500",
    "from-cyan-500 to-blue-500",
    "from-sky-500 to-indigo-500",
    "from-violet-500 to-fuchsia-500",
    "from-purple-500 to-pink-500",
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default function ProjectCard() {
  const gradient = getRandomGradient();

  return (
    <Link
      href={`/projects/my_project`}
      className="p-3 w-full flex flex-col gap-3 rounded-xl bg-white"
    >
      <div className="flex items-center gap-2">
        <span
          className={`p-2 aspect-square bg-gradient-to-r ${gradient} rounded-lg text-xl text-white`}
        >
          <Folder2Icon />
        </span>
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm font-bold my-1">label</h3>
          <span className="text-xs text-neutral-400">description</span>
        </div>
        <AvatarGroup size="sm">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </div>

      <Progress
        size="xs"
        radius="full"
        classNames={{
          base: "rounded-lg w-full",
          indicator: `bg-gradient-to-r ${gradient}`,
        }}
        value={40}
      />
    </Link>
  );
}
