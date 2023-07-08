import TaskItem from "@/components/Tasks/TaskItem";
import ProjectSummaryCart from "@/components/Projects/ProjectSummaryCart";
import { getProjects } from "@/services/db/project";

export const revalidate = 0;

export default async function TasksPage() {
  const projects = await getProjects();

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-auto pr-2">
      <div className="w-full flex overflow-auto items-center gap-4 min-h-[120px]">
        {projects.map((project) => (
          <ProjectSummaryCart
            key={project.id}
            totalTasks={project.tasks.length}
            completedTasks={
              project.tasks.filter((task) => task.completed).length
            }
            label={project.title}
            totalParticipants={project.participants.length}
            id={project.id}
            endDate={project.endDate}
            startDate={project.startDate}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full">
        {projects.map((project) => (
          <div key={project.id} className="flex gap-2 flex-col">
            <header className="flex justify-between">
              <h3 className="text-lg font-bold ">{project.title}</h3>
              <span className="text-sm font-bold text-gray-500">
                {project.tasks.filter((task) => task.completed).length}/
                {project.tasks.length}
              </span>
            </header>
            <div className="flex flex-col gap-2">
              {project.tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
