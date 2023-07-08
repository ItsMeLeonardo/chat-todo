import TaskItem from "@/components/Tasks/TaskItem";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import { getProject } from "@/services/db/project";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import ProjectData from "./components/ProjectData";
import MessageNotifyIcon from "@/icons/MessageNotifyIcon";

type PageProps = { params: { id: string } };
export default async function TasksIdPage({ params }: PageProps) {
  const project = await getProject(params.id);

  return (
    <div className="p-2 flex h-full w-full flex-col gap-2">
      <header className="flex justify-center py-2 items-center w-full relative">
        <Button
          isIconOnly
          className="absolute top-0 left-0"
          href="/tasks"
          variant="light"
          color="default"
          as={Link}
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="text-lg font-bold ">{project?.title}</h1>
        <Button
          isIconOnly
          className="absolute top-0 right-0 text-2xl"
          href={`/conversation/${project?.id}`}
          variant="light"
          color="secondary"
          as={Link}
        >
          <MessageNotifyIcon />
        </Button>
      </header>

      {project && (
        <ProjectData
          endDate={project.endDate}
          startDate={project.startDate}
          completedTasks={project.tasks.filter((task) => task.completed).length}
          totalTasks={project.tasks.length}
          participants={project.participants}
        />
      )}
      <div className="flex flex-col gap-2 overflow-auto">
        {project?.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
