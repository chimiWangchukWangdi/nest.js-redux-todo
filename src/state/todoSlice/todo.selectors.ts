import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { todoAdapter, TodoState, TODO_FEATURE_KEY } from "./todo.reducer";

const { selectAll, selectEntities, selectTotal, selectIds } =
  todoAdapter.getSelectors();
export const selectTodoState = (rootState: RootState): TodoState =>
  rootState[TODO_FEATURE_KEY];

const selectAllTodo = createSelector(selectTodoState, selectAll);
const selectTodoEntities = createSelector(selectTodoState, selectEntities);
const selectErrors = createSelector(selectTodoState, (state) => state?.errors);
const selectLoadingStatus = createSelector(
  selectTodoState,
  (state) => state?.loadingStatus
);
const selectTodoIds = createSelector(selectTodoState, selectIds);
const selectedTodo = createSelector(
  selectTodoState,
  (state) => state.selectedTodo
);
export const todoSelectors = {
  selectAllTodo,
  selectTodoEntities,
  selectErrors,
  selectLoadingStatus,
  selectTodoIds,
  selectedTodo,
};
