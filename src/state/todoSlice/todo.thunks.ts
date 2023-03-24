import { TodoModel } from "@/model";
import { commonResponseHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserFacadeService } from "./todo.facade";

export const fetchTodo = createAsyncThunk(
  "todo/getTodo",
  async (_, thunkAPI) => {
    return await commonResponseHandler(UserFacadeService.getTodo(), thunkAPI);
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload: string, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.deleteTodo(payload),
      thunkAPI
    );
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (payload: TodoModel, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.createTodo(payload),
      thunkAPI
    );
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (payload: TodoModel, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.updateTodo(payload),
      thunkAPI
    );
  }
);

export const getTodoById = createAsyncThunk(
  "todo/get todo by id",
  async (payload: string, thunkAPI) => {
    return await commonResponseHandler(
      UserFacadeService.getTodoById(payload),
      thunkAPI
    );
  }
);
