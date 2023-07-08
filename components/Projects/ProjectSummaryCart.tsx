"use client";
import { Progress, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useMemo } from "react";

export type ProjectSummaryCartProps = {
  totalTasks: number;
  completedTasks: number;
  label: string;
  id: string;
  totalParticipants: number;
  endDate: number;
  startDate: number;
};

export default function ProjectSummaryCart(props: ProjectSummaryCartProps) {
  const {
    totalTasks,
    completedTasks,
    label,
    id,
    totalParticipants,
    startDate,
    endDate,
  } = props;

  const totalDays = useMemo(() => {
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  }, [endDate, startDate]);

  const daysLeft = useMemo(() => {
    return Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));
  }, [endDate]);

  const daysPassed = totalDays - daysLeft;
  return (
    <Link
      href={`tasks/${id}`}
      className="p-3 w-60 min-w-[15rem] rounded-xl bg-white"
    >
      <header className="text-xs text-neutral-400 flex items-center gap-4">
        <span>{totalTasks} Tareas</span>
        <span>{totalParticipants} Participantes</span>
      </header>

      <h3 className="text-sm font-bold my-1">{label}</h3>

      <Progress
        size="xs"
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
        size="xs"
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
        label="Días transcurridos"
      />
    </Link>
  );
}
