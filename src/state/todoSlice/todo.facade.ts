import { APIErrorResponse, APIResponse, TodoModel } from "@/model";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "@/service/todo.api.service";

export class UserFacadeService {
  static getTodo(): Promise<APIResponse<TodoModel[]> | APIErrorResponse<any>> {
    return getTodos();
  }

  static deleteTodo(id: string) {
    return deleteTodo(id);
  }

  static createTodo(payload: TodoModel) {
    return createTodo(payload);
  }

  static updateTodo(payload: TodoModel) {
    return updateTodo(payload);
  }

  static getTodoById(payload: string) {
    return getTodoById(payload);
  }
}
