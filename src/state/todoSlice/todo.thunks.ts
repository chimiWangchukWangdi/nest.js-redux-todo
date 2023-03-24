import { TodoModel } from "@/model";
import { commonResponseHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserFacadeService } from "./todo.facade";

/**
 * Fetches all todos.
 */
export const fetchTodo = createAsyncThunk(
  "todo/getTodo",
  async (_, thunkAPI) => {
    return await commonResponseHandler(UserFacadeService.getTodo(), thunkAPI);
  }
);

/**
 * Deletes a todo by id.
 * @param payload - The id of the todo to delete.
 */
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload: string, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.deleteTodo(payload),
      thunkAPI
    );
  }
);

/**
 * Creates a new todo.
 * @param payload - The todo to create.
 */
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (payload: TodoModel, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.createTodo(payload),
      thunkAPI
    );
  }
);

/**
 * Updates an existing todo.
 * @param payload - The todo to update.
 */
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (payload: TodoModel, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.updateTodo(payload),
      thunkAPI
    );
  }
);

/**
 * Fetches a todo by id.
 * @param payload - The id of the todo to fetch.
 */
export const getTodoById = createAsyncThunk(
  "todo/get todo by id",
  async (payload: string, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.getTodoById(payload),
      thunkAPI
    );
  }
);
