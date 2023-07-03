"use client";

import Folder2Icon from "@/icons/Folder2Icon";
import { Project } from "@/types/projects";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Progress } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  project: Project;
};

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

export default function ProjectCard({ project }: Props) {
  const gradient = getRandomGradient();

  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const completeProgress = (100 * completedTasks) / project.tasks.length;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="p-3 w-full flex flex-col gap-3 rounded-xl bg-white"
    >
      <div className="flex items-center gap-2">
        <span
          className={`p-2 aspect-square bg-gradient-to-r ${gradient} rounded-lg text-xl text-white`}
        >
          <Folder2Icon />
        </span>
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm font-bold my-1">{project.title}</h3>
          {project.description && (
            <span className="text-xs text-neutral-400">
              {project.description}
            </span>
          )}
        </div>
        <AvatarGroup size="sm">
          {project.participants.map((participant) => (
            <Avatar
              key={participant.id}
              src={participant.avatar}
              alt={participant.name}
              title={participant.name}
            />
          ))}
        </AvatarGroup>
      </div>

      <Progress
        size="xs"
        radius="full"
        classNames={{
          base: "rounded-lg w-full",
          indicator: `bg-gradient-to-r ${gradient}`,
        }}
        value={completeProgress}
      />
    </Link>
  );
}
