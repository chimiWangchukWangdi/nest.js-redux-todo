import { RestMethods, TodoModel } from "@/model";
import { FetchAPI } from "./rest.service";

/**
 *Fetches all todos from the API.
 *@returns A Promise of an APIResponse containing an array of TodoModel objects, or an APIErrorResponse if there was an error.
 */
export const getTodos = () => {
  const url = `todos`;
  return FetchAPI<TodoModel[]>(url, RestMethods.Get);
};

/**
 *Deletes a todo with the specified id from the API.
 *@param id The id of the todo to be deleted.
 *@returns A Promise of an APIResponse containing an empty object, or an APIErrorResponse if there was an error.
 */
export const deleteTodo = (id: string) => {
  const url = `todos/${id}`;
  return FetchAPI<{}>(url, RestMethods.Delete);
};

/**
 *Creates a new todo on the API with the specified payload.
 *@param payload An object containing the properties of the new todo to be created.
 *@returns A Promise of an APIResponse containing a TodoModel object representing the newly created todo, or an APIErrorResponse if there was an error.
 */
export const createTodo = (payload: TodoModel) => {
  const url = `todos`;
  return FetchAPI<TodoModel>(url, RestMethods.Post, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

/**
 *Updates an existing todo on the API with the specified payload.
 *@param payload An object containing the properties of the todo to be updated.
 *@returns A Promise of an APIResponse containing an empty object, or an APIErrorResponse if there was an error.
 */
export const updateTodo = (payload: TodoModel) => {
  const url = "todos/" + payload.id;
  return FetchAPI(url, RestMethods.Put, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

/**
 *Fetches a single todo with the specified id from the API.
 *@param id The id of the todo to be fetched.
 *@returns A Promise of an APIResponse containing a TodoModel object representing the requested todo, or an APIErrorResponse if there was an error.
 */
export const getTodoById = (payload: string) => {
  const url = "todos/" + payload;
  return FetchAPI<TodoModel>(url, RestMethods.Get);
};
