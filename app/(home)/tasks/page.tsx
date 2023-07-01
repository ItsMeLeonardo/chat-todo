import TaskItem from "@/components/Tasks/TaskItem";
import TaskSummaryCart from "@/components/Tasks/TaskSummaryCart";

export default function TasksPage() {
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <div className="w-full flex gap-4">
        <TaskSummaryCart
          totalTasks={10}
          completedTasks={5}
          label="Tareas de la semana"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <TaskItem label="Tarea 1" createdAt={1686724588000} />
      </div>
    </div>
  );
}
