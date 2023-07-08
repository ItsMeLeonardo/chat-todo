"use client";
import { memo, useMemo, useState } from "react";
import { Checkbox, Progress, cn } from "@nextui-org/react";
import { timeAgo } from "@/utils/date";
import { Task } from "@/types/tasks";
import { toggleTaskComplete } from "@/services/db/project";

export type TaskItemProps = {
  task: Task;
  onValueChange?: (value: boolean) => void;
  projectId: string;
};

function TaskItem({ task, projectId }: TaskItemProps) {
  const { title, createdAt, completed, startDate, endDate } = task;

  const [isSelected, setIsSelected] = useState<boolean>(completed);

  const totalDays = useMemo(() => {
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  }, [endDate, startDate]);

  const daysLeft = useMemo(() => {
    return Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));
  }, [endDate]);

  const delayedDays = useMemo(() => {
    return Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const isDelayed = delayedDays > 0;

  return (
    <Checkbox
      classNames={{
        base: cn(
          "inline-flex w-full max-w-md bg-white",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-xl gap-2 p-2 border-2 border-transparent",
          "data-[selected=true]:border-secondary data-[selected=true]"
        ),
        label: "w-full",
      }}
      color="secondary"
      lineThrough
      isSelected={isSelected}
      onValueChange={(completed) => {
        setIsSelected(completed);
        toggleTaskComplete(projectId, task.id);
      }}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span className="flex-grow text-sm font-bold">{title}</span>
          <time className="text-xs text-neutral-300">{timeAgo(createdAt)}</time>
        </div>

        {!completed && (
          <>
            {!isDelayed ? (
              <Progress
                size="xs"
                radius="full"
                classNames={{
                  base: "rounded-lg w-full",
                }}
                maxValue={totalDays}
                value={daysLeft}
                color={
                  daysLeft > 0
                    ? "success"
                    : daysLeft <= 0
                    ? "warning"
                    : "danger"
                }
                formatOptions={{
                  style: "unit",
                  unit: "day",
                }}
                showValueLabel={true}
                label="Días Restantes"
              />
            ) : (
              <Progress
                size="xs"
                radius="full"
                classNames={{
                  base: "rounded-lg w-full",
                }}
                maxValue={delayedDays}
                value={delayedDays}
                color="danger"
                formatOptions={{
                  style: "unit",
                  unit: "day",
                }}
                showValueLabel={true}
                label="Días retrasados"
              />
            )}
          </>
        )}
      </div>
    </Checkbox>
  );
}

export default memo(TaskItem);
