import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { todoAdapter, TodoState, TODO_FEATURE_KEY } from "./todo.reducer";

const { selectAll, selectEntities, selectTotal, selectIds } =
  todoAdapter.getSelectors();

/**
 * Selects the Todo feature state from the root state.
 * @function
 * @param {RootState} rootState - The root state of the application.
 * @returns {TodoState} The Todo feature state.
 */
export const selectTodoState = (rootState: RootState): TodoState =>
  rootState[TODO_FEATURE_KEY];

/**
 * Selects all Todo entities from the Todo feature state.
 * @function
 * @returns {TodoModel[]} An array of all Todo entities.
 */
const selectAllTodo = createSelector(selectTodoState, selectAll);

/**
 * Selects the Todo entities from the Todo feature state.
 * @function
 * @returns {Record<string, TodoModel>} An object containing Todo entities by their IDs.
 */
const selectTodoEntities = createSelector(selectTodoState, selectEntities);

/**
 * Selects the errors from the Todo feature state.
 * @function
 * @returns {string[] | null} An array of errors or null.
 */
const selectErrors = createSelector(selectTodoState, (state) => state?.errors);

/**
 * Selects the loading status from the Todo feature state.
 * @function
 * @returns {string | null} The loading status or null.
 */
const selectLoadingStatus = createSelector(
  selectTodoState,
  (state) => state?.loadingStatus
);

/**
 * Selects the Todo IDs from the Todo feature state.
 * @function
 * @returns {string[]} An array of Todo IDs.
 */
const selectTodoIds = createSelector(selectTodoState, selectIds);

/**
 * Selects the selected Todo entity from the Todo feature state.
 * @function
 * @returns {TodoModel | null} The selected Todo entity or null.
 */
const selectedTodo = createSelector(
  selectTodoState,
  (state) => state.selectedTodo
);

/**
 * Object containing all Todo selectors.
 * @namespace
 */
export const todoSelectors = {
  selectAllTodo,
  selectTodoEntities,
  selectErrors,
  selectLoadingStatus,
  selectTodoIds,
  selectedTodo,
};
