"use client";

import { Input, Textarea } from "@nextui-org/input";
import TaskSections from "./TaskSections";
import { Button } from "@nextui-org/button";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import Link from "next/link";
import ParticipantsSection from "./ParticipantsSection";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "@/types/user";
import { Task } from "@/types/tasks";
import { addProject } from "@/services/db/db";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DurationSection from "./DurationSection";

export type FormProjectValues = {
  title: string;
  description: string;
  participants: User[];
  tasks: Task[];
  startDate: Date;
  endDate: Date;
};

export default function ProjectForm() {
  const methods = useForm<FormProjectValues>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit = (data: FormProjectValues) => {
    setLoading(true);
    addProject({
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...data,
    })
      .then(() => {
        router.push("/projects");
      })
      .finally(() => setLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full flex flex-col gap-4 overflow-auto">
        <header className="flex justify-center py-2 items-center w-full relative">
          <Button
            isIconOnly
            className="absolute top-0 left-0"
            href="/projects"
            variant="light"
            disabled={loading}
            color="default"
            as={Link}
          >
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-sm text-center font-bold">Project</h1>
        </header>

        <Input
          size="xs"
          label="Nombre del proyecto"
          disabled={loading}
          {...register("title", { required: true })}
          errorMessage={errors?.title?.message}
          validationState={errors?.title?.message ? "invalid" : undefined}
        />
        <Textarea
          size="xs"
          minRows={1}
          disabled={loading}
          maxRows={3}
          label="Descripción del proyecto"
          {...register("description")}
        />

        <DurationSection />

        <ParticipantsSection />
        <TaskSections />

        <footer className="sticky bottom-2 w-full ">
          <Button
            color="secondary"
            fullWidth
            onPress={() => handleSubmit(onSubmit)()}
            isLoading={loading}
          >
            Guardar
          </Button>
        </footer>
      </div>
    </FormProvider>
  );
}
