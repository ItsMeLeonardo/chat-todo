import { Task } from "../tasks";

export type Project = {
  id: string;
  title: string;
  description?: string;
  tasks?: Task[];
  participants?: string[]; // User ID
  createdAt: number;
  updatedAt: number;
};
