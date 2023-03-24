/**
 * Interface for a Todo item
 */
export interface TodoModel {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: TodoPriority;
  completed: string;
}

/**
 * Interface for a category of Todo items
 */
export interface Category {
  [key: string]: any;
  priority: string[];
  completed: string[];
}

/**
 * Enum representing the priority of a Todo item
 */
export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

/**
 * Object representing the completion status of a Todo item
 */
export const TodoCompleted = {
  YES: "Completed",
  NO: "In-Progress",
};
