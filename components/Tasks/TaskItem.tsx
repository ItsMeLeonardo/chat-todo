"use client";
import { memo, useState } from "react";
import { Checkbox, cn } from "@nextui-org/react";
import { timeAgo } from "@/utils/date";

export type TaskItemProps = {
  label: string;
  createdAt: number;
  onValueChange?: (value: boolean) => void;
  isCompleted?: boolean;
  disabled?: boolean;
};

function TaskItem(props: TaskItemProps) {
  const { label, createdAt, isCompleted, disabled } = props;

  const [isSelected, setIsSelected] = useState(isCompleted);

  return (
    <Checkbox
      isDisabled={disabled}
      classNames={{
        base: cn(
          "inline-flex w-full max-w-md bg-white",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-xl gap-2 p-2 md:p-4 border-2 border-transparent",
          "data-[selected=true]:border-secondary data-[selected=true]"
        ),
        label: "w-full",
      }}
      color="secondary"
      lineThrough
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      <div className="w-full flex justify-between items-center">
        <span className="flex-grow text-sm font-bold">{label}</span>
        <time className="text-xs text-neutral-300">{timeAgo(createdAt)}</time>
      </div>
    </Checkbox>
  );
}

export default memo(TaskItem);
