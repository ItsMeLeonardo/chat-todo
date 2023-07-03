"use client";
import { Task } from "@/types/tasks";
import { FormEvent, useEffect, useState } from "react";

import AddIcon from "@/icons/AddIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import TaskItem from "@/components/Tasks/TaskItem";
import { useFormContext } from "react-hook-form";
import { FormProjectValues } from ".";
import TrashIcon from "@/icons/TrashIcon";

type Props = {
  tasks?: Task[];
};

export default function TaskSections(props: Props) {
  const { register, setValue } = useFormContext<FormProjectValues>();

  const [tasks, setTasks] = useState<Task[]>(props.tasks ?? []);

  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    register("tasks", { required: true });
  }, [register]);

  useEffect(() => {
    setValue("tasks", tasks);
  }, [setValue, tasks]);

  const handleAddTask = () => {
    if (!taskTitle || !taskTitle.trim().length) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle("");
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-bold">Tareas</span>
      <div
        className="w-full flex gap-2 items-center"
        onKeyDown={(e) => {
          e.stopPropagation();
          const key = e.key.toLowerCase();
          if (key === "enter") {
            handleAddTask();
          }
        }}
      >
        <Input
          size="xs"
          name="task_title"
          label="Agregar tarea"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          isIconOnly
          type="submit"
          className="from-pink-500 to-yellow-500 bg-gradient-to-tr text-white text-2xl"
          onPress={handleAddTask}
        >
          <AddIcon />
        </Button>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="flex gap-2 items-center">
          <TaskItem createdAt={task.createdAt} label={task.title} disabled />
          <Button
            isIconOnly
            color="danger"
            radius="xl"
            className="text-red-500 bg-red-50 text-xl"
            onPress={() => {
              handleRemoveTask(task.id);
            }}
          >
            <TrashIcon />
          </Button>
        </div>
      ))}
    </div>
  );
}
