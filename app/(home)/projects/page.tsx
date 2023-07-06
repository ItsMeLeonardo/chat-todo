import ProjectCard from "@/components/Projects/ProjectCard";
import AddIcon from "@/icons/AddIcon";
import { getProjects } from "@/services/db/project";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export const revalidate = 0;

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div className="flex gap-2 flex-col overflow-auto h-full p-1">
      <header className="flex justify-between items-center">
        <h1 className="text-base font-bold">Proyectos actuales</h1>

        <Button
          isIconOnly
          as={Link}
          href="/projects/new"
          className="from-pink-500 to-yellow-500 bg-gradient-to-tr text-white text-2xl"
        >
          <AddIcon />
        </Button>
      </header>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
