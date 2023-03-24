import { TodoModel } from "@/model";
import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { createTodo, deleteTodo, fetchTodo, getTodoById } from "./todo.thunks";

export const TODO_FEATURE_KEY = "todo";

export interface TodoState extends EntityState<TodoModel> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  errors: string[] | null;
  selectedTodo: TodoModel | null;
}

export const todoAdapter = createEntityAdapter<TodoModel>({
  selectId: (user: TodoModel) => user?.id,
});

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  loadingStatus: "not loaded",
  errors: null,
  selectedTodo: null,
});

export const todoSlice = createSlice({
  name: TODO_FEATURE_KEY,
  initialState: initialTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        todoAdapter.setAll(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchTodo.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.meta.arg);
        state.loadingStatus = "loaded";
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(createTodo.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.loadingStatus = "loaded";
        state.selectedTodo = action.payload;
      })
      .addCase(getTodoById.pending, (state, action) => {
        state.loadingStatus = "loading";
      })
      .addCase(getTodoById.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.errors = action.payload as string[];
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const todoReducer = todoSlice.reducer;
