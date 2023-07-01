"use client";
import { Task } from "@/types/tasks";
import { FormEvent, useState } from "react";

import AddIcon from "@/icons/AddIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import TaskItem from "@/components/Tasks/TaskItem";

type Props = {
  tasks?: Task[];
};

export default function TaskSections(props: Props) {
  const [tasks, setTasks] = useState<Task[]>(props.tasks ?? []);

  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-bold">Tareas</span>
      <form className="w-full flex gap-2 items-center" onSubmit={handleAddTask}>
        <Input
          size="xs"
          name="task_title"
          label="Agregar tarea"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          isIconOnly
          className="from-pink-500 to-yellow-500 bg-gradient-to-tr text-white text-2xl"
        >
          <AddIcon />
        </Button>
      </form>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          createdAt={task.createdAt}
          label={task.title}
          disabled
        />
      ))}
    </div>
  );
}
