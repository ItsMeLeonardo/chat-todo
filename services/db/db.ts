import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

import { app } from "@/services/api";
import { Project } from "@/types/projects";

export const db = getFirestore(app);

export async function addProject(project: Omit<Project, "id">) {
  try {
    const docRef = await addDoc(collection(db, "projects"), project);
    return docRef.id;
  } catch (error) {
    console.error(error);
  }
}
