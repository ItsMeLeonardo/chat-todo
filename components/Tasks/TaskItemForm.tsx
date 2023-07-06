"use client";

import { Checkbox, cn } from "@nextui-org/react";

export type TaskItemFormProps = {
  label: string;
  duration: string;
};

export default function TaskItemForm(props: TaskItemFormProps) {
  const { label, duration } = props;

  return (
    <Checkbox
      classNames={{
        base: cn(
          "inline-flex w-full max-w-md bg-white",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-xl gap-2 p-2 md:p-4 border-2 border-transparent",
          "data-[selected=true]:border-secondary"
        ),
        label: "w-full",
      }}
      color="secondary"
      lineThrough
    >
      <div className="w-full flex justify-between items-center">
        <span className="flex-grow text-sm font-bold">{label}</span>
        <time className="text-xs text-neutral-500 font-bold">
          Duración: {duration}
        </time>
      </div>
    </Checkbox>
  );
}
