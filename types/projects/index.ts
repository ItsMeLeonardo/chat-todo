import { Task } from "../tasks";
import { User } from "../user";

export type Project = {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  participants: User[];
  createdAt: number;
  updatedAt: number;
  endDate: number;
  startDate: number;
};
