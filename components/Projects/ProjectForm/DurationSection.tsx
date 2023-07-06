"use client";
import { getDuration } from "@/utils/date";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { FormProjectValues } from ".";

export default function DurationSection() {
  const { register, watch } = useFormContext<FormProjectValues>();

  const endDate = watch("endDate");
  const startDate = watch("startDate");

  const duration = startDate && endDate && getDuration(startDate, endDate);

  return (
    <div className="w-full flex flex-col gap-2  relative z-10">
      <span className="text-xs font-bold flex gap-2">
        <span>Duración</span>
        {duration && duration.trim() && (
          <span className="font-bold text-orange-500">{`(${duration.trim()})`}</span>
        )}
      </span>

      <div className="flex gap-2">
        <Input
          size="xs"
          type="date"
          label="Fecha de inicio"
          defaultValue={new Date().toISOString().split("T")[0]}
          {...register("startDate", {
            required: true,
            valueAsDate: true,
          })}
        />
        <Input
          size="xs"
          type="date"
          label="Fecha de finalización"
          defaultValue={new Date().toISOString().split("T")[0]}
          {...register("endDate", {
            required: true,
            valueAsDate: true,
          })}
        />
      </div>
    </div>
  );
}
