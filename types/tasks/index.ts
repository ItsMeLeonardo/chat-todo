export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: number;
  completedBy?: string; // User ID
  createdAt: number;
  updatedAt: number;
  startDate: number;
  endDate: number;
};
