"use client";
import { Progress } from "@nextui-org/react";
import Link from "next/link";

export type TaskSummaryCartProps = {
  totalTasks: number;
  completedTasks: number;
  label: string;
};

export default function TaskSummaryCart(props: TaskSummaryCartProps) {
  const { totalTasks, completedTasks, label } = props;

  const percentageProgress = (100 * completedTasks) / totalTasks;

  return (
    <Link href={`tasks/${label}`} className="p-3 w-40 pt-6 rounded-xl bg-white">
      <header className="text-xs text-neutral-400">{totalTasks} Tareas</header>

      <h3 className="text-sm font-bold my-1">{label}</h3>

      <Progress
        size="sm"
        radius="full"
        classNames={{
          base: "rounded-lg w-full",
          indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        }}
        value={percentageProgress}
      />
    </Link>
  );
}
