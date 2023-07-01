import TaskItem from "@/components/Tasks/TaskItem";

type PageProps = { params: { id: string } };
export default function TasksIdPage({ params }: PageProps) {
  return (
    <div className="p-2 flex h-full w-full flex-col gap-2">
      <header>
        <h1 className="text-lg font-bold ">{params.id}</h1>
      </header>

      <div className="flex flex-col gap-2 overflow-auto">
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
        <TaskItem createdAt={1686724588000} label="Tarea 1" />
      </div>
    </div>
  );
}
