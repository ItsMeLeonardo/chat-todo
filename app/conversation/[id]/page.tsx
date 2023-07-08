import PinnedMessage from "@/components/Conversation/PinnedMessage";
import { getConversation } from "@/services/db/conversations";
import MessageList from "./components/MessageList";
import { getProject } from "@/services/db/project";
import { Project } from "@/types/projects";

type Props = {
  params: {
    id: string;
  };
};

const getPinnedProjectMessage = (project: Project): string | null => {
  const endDate = new Date(project.endDate);

  const daysLeft = Math.floor(
    (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft <= 0) {
    return `El proyecto ${project.title} esta atrasado por ${daysLeft} dias`;
  }

  if (daysLeft <= 3) {
    return `Solo quedan ${daysLeft} dias para que termine el proyecto ${project.title}`;
  }

  return null;
};

const getPinnedTaskMessage = (project: Project): string | null => {
  const endDate = new Date(project.endDate);

  const daysLeft = Math.floor(
    (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const tasks = project.tasks.filter((task) => {
    const daysLeft = Math.floor(
      (new Date(task.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return daysLeft <= 3;
  });

  if (tasks.length > 0) {
    return `Solo quedan ${daysLeft} dias para que termine el proyecto ${project.title}, y tienes ${tasks.length} tareas atrasadas`;
  }

  const tasksWithDaysLeft = project.tasks.filter((task) => {
    const daysLeft = Math.floor(
      (new Date(task.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return daysLeft <= 7;
  });

  if (tasksWithDaysLeft.length > 0) {
    return `Solo quedan ${daysLeft} dias para que termine el proyecto ${project.title}, y tienes ${tasksWithDaysLeft.length} tareas con menos de 7 dias para terminar`;
  }

  return null;
};

export default async function ConversationPage({ params }: Props) {
  const conversations = await getConversation(params.id);

  const project = await getProject(params.id);

  if (!project) {
    return (
      <div className="flex flex-col gap-2 h-full relative">
        <div className="absolute w-full top-0 left-0 flex flex-col gap-3">
          No se encontro el proyecto
        </div>
      </div>
    );
  }

  const projectPinnedMessage = getPinnedProjectMessage(project);
  const taskPinnedMessage = getPinnedTaskMessage(project);

  return (
    <div className="flex flex-col gap-2 h-full relative">
      <div className="absolute w-full top-0 left-0 flex flex-col gap-3">
        {projectPinnedMessage && (
          <PinnedMessage message={projectPinnedMessage} />
        )}
        {taskPinnedMessage && <PinnedMessage message={taskPinnedMessage} />}
      </div>
      <MessageList conversation={conversations} />
    </div>
  );
}
