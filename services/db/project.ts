import { Project } from "@/types/projects";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "./db";
import { addConversation } from "./conversations";
import { Conversation } from "@/types/conversation";
import { Task } from "@/types/tasks";

export async function createProject(project: Omit<Project, "id">) {
  try {
    const projectCollection = collection(db, "projects");

    const projectRef = await addDoc(projectCollection, project);

    const conversation: Conversation = {
      id: projectRef.id,
      messages: [],
    };

    await addConversation(conversation);

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
        endDate: data.endDate,
        startDate: data.startDate,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const projectCollection = collection(db, "projects");
    const projectRef = doc(projectCollection, id);
    const projectDoc = await getDoc(projectRef);

    if (!projectDoc.exists()) return null;

    return {
      id: projectDoc.id,
      title: projectDoc.data().title,
      description: projectDoc.data().description,
      tasks: projectDoc.data().tasks,
      participants: projectDoc.data().participants,
      createdAt: projectDoc.data().createdAt,
      updatedAt: projectDoc.data().updatedAt,
      endDate: projectDoc.data().endDate,
      startDate: projectDoc.data().startDate,
    };
  } catch (error) {
    console.error(`${error} in getProject`);
    return null;
  }
}

export async function toggleTaskComplete(projectId: string, taskId: string) {
  try {
    const projectRef = doc(db, "projects", projectId);

    const projectSnapshot = await getDoc(projectRef);
    const tasks: Task[] = projectSnapshot.data()?.tasks || [];

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    await updateDoc(projectRef, {
      tasks: updatedTasks,
    });
  } catch (error) {
    console.error(`${error} in changeTaskState`);
  }
}
