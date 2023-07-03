import { Project } from "@/types/projects";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import { db } from "./db";

export async function createProject(project: Project) {
  try {
    const projectCollection = collection(db, "projects");

    const projectRef = await addDoc(projectCollection, project);

    return projectRef.id;
  } catch (error) {
    console.error(`${error} in createProject`);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projectCollection = collection(db, "projects");
    const projectSnapshot = await getDocs(projectCollection);

    return projectSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        tasks: data.tasks,
        participants: data.participants,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    return [];
  }
}
