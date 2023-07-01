import ProjectForm from "@/components/Projects/ProjectForm";

type Props = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: Props) {
  const { slug } = params;

  return <ProjectForm />;
}
