import { APIErrorResponse, APIResponse, RestMethods, TodoModel } from "@/model";
import { EntityId } from "@reduxjs/toolkit";
import { FetchAPI } from "./rest.service";

export const getTodos = () => {
  const url = `todos`;
  return FetchAPI<TodoModel[]>(url, RestMethods.Get);
};

export const deleteTodo = (id: string) => {
  const url = `todos/${id}`;
  return FetchAPI<{}>(url, RestMethods.Delete);
};

export const createTodo = (payload: TodoModel) => {
  const url = `todos`;
  return FetchAPI<TodoModel>(url, RestMethods.Post, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const updateTodo = (payload: TodoModel) => {
  const url = "todos/" + payload.id;
  return FetchAPI(url, RestMethods.Put, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const getTodoById = (payload: string) => {
  const url = "todos/" + payload;
  return FetchAPI<TodoModel>(url, RestMethods.Get);
};
