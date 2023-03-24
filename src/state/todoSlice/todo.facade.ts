import { APIErrorResponse, APIResponse, TodoModel } from "@/model";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "@/service/todo.api.service";

/**
 *Facade service for interacting with the todo API service
 */
export class UserFacadeService {
  /**
   *Fetches all todos
   *@returns Promise containing an APIResponse of type TodoModel[] or an APIErrorResponse
   */
  static getTodo(): Promise<APIResponse<TodoModel[]> | APIErrorResponse<any>> {
    return getTodos();
  }

  /**
   *Deletes a todo
   *@param id - The ID of the todo to delete
   *@returns Promise containing an APIResponse of type {} or an APIErrorResponse
   */
  static deleteTodo(id: string) {
    return deleteTodo(id);
  }

  /**
   *Creates a new todo
   *@param payload - The payload of the todo to create
   *@returns Promise containing an APIResponse of type TodoModel or an APIErrorResponse
   */
  static createTodo(payload: TodoModel) {
    return createTodo(payload);
  }

  /**
   *Updates an existing todo
   *@param payload - The payload of the todo to update
   *@returns Promise containing an APIResponse of type TodoModel or an APIErrorResponse
   */
  static updateTodo(payload: TodoModel) {
    return updateTodo(payload);
  }

  /**
   *Fetches a single todo by ID
   *@param payload - The ID of the todo to fetch
   *@returns Promise containing an APIResponse of type TodoModel or an APIErrorResponse
   */
  static getTodoById(payload: string) {
    return getTodoById(payload);
  }
}
