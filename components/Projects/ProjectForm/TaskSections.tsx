"use client";
import { Task } from "@/types/tasks";
import { useEffect, useState } from "react";

import AddIcon from "@/icons/AddIcon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { FormProjectValues } from ".";
import TrashIcon from "@/icons/TrashIcon";
import TaskItemForm from "@/components/Tasks/TaskItemForm";
import CalendarIcon from "@/icons/CalendarIcon";
import { getDuration } from "@/utils/date";
import EditTaskForm from "@/components/Tasks/EditTaskForm";

type Props = {
  tasks?: Task[];
};

export default function TaskSections(props: Props) {
  const { register, setValue, getValues } = useFormContext<FormProjectValues>();

  const [tasks, setTasks] = useState<Task[]>(props.tasks ?? []);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    register("tasks", { required: true });
  }, [register]);

  useEffect(() => {
    setValue("tasks", tasks);
  }, [setValue, tasks]);

  const handleAddTask = () => {
    if (!taskTitle || !taskTitle.trim().length) return;

    const startDate = getValues("startDate");
    const endDate = getValues("endDate");

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle("");
  };

  const handleEditTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
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
          <TaskItemForm
            duration={getDuration(
              new Date(task.startDate),
              new Date(task.endDate)
            )}
            label={task.title}
          />
          <Button
            isIconOnly
            color="danger"
            radius="xl"
            className="text-indigo-500 bg-indigo-50 text-xl"
            onPress={() => {
              setSelectedTask(task);
            }}
          >
            <CalendarIcon />
          </Button>
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

      {selectedTask && (
        <EditTaskForm
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          onSaved={(task) => {
            handleEditTask(task);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
