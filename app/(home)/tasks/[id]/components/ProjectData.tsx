"use client";

import { Project } from "@/types/projects";
import { Avatar, AvatarGroup, Progress, Spacer } from "@nextui-org/react";
import { useMemo } from "react";

type ProjectDataProps = {
  endDate: number;
  startDate: number;
  totalTasks: number;
  completedTasks: number;
  participants: Project["participants"];
};

export default function ProjectData(props: ProjectDataProps) {
  const { endDate, startDate, totalTasks, completedTasks, participants } =
    props;

  const totalDays = useMemo(() => {
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  }, [endDate, startDate]);

  const daysLeft = useMemo(() => {
    return Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));
  }, [endDate]);

  const daysPassed = totalDays - daysLeft;

  return (
    <div className="py-2">
      <div className="w-full flex flex-col gap-2 items-start mb-2">
        <span className="text-xs font-bold">Participantes</span>
        <AvatarGroup size="sm">
          {participants.map((participant) => (
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
        size="sm"
        radius="full"
        classNames={{
          base: "rounded-lg w-full",
          indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        }}
        maxValue={totalTasks}
        value={completedTasks}
        showValueLabel={true}
        label="Tareas completadas"
      />

      <Spacer y={2} />

      <Progress
        size="sm"
        radius="full"
        classNames={{
          base: "rounded-lg w-full",
        }}
        maxValue={totalDays}
        value={daysPassed}
        color={
          daysPassed < totalDays / 2
            ? "success"
            : daysPassed >= totalDays
            ? "danger"
            : "warning"
        }
        formatOptions={{
          style: "unit",
          unit: "day",
        }}
        showValueLabel={true}
        label={
          daysPassed < totalDays / 2
            ? "A tiempo"
            : daysPassed >= totalDays
            ? "Atrasado"
            : "A punto de atrasarse"
        }
      />
    </div>
  );
}
