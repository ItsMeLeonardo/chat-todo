import ProjectCard from "@/components/Projects/ProjectCard";
import AddIcon from "@/icons/AddIcon";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function ProjectPage() {
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
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
}
