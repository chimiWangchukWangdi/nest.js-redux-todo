export interface TodoModel {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: TodoPriority;
  completed: string;
}

export interface Category {
  [key: string]: any;
  priority: string[];
  completed: string[];
}

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export const TodoCompleted = {
  YES: "Completed",
  NO: "In-Progress",
};
