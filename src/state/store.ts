/**
 * This module exports a configured store instance that uses Redux Toolkit,
 * along with type definitions for the state and dispatch functions.
 * It also exports hooks that allow for easy and type-safe access to the store
 * and its dispatch function.
 */

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoReducer, TODO_FEATURE_KEY } from "./todoSlice/todo.reducer";

/**
 * A helper function that determines if the app is running in production mode
 * based on the value of the NODE_ENV environment variable.
 *
 * @returns {boolean} True if the app is running in production mode, false otherwise.
 */
const isProduction = () => process.env.NODE_ENV === "production";

/**
 * The store instance for the app, created using the `configureStore` function from Redux Toolkit.
 */
export const store = configureStore({
  reducer: {
    [TODO_FEATURE_KEY]: todoReducer,
  },
  devTools: !isProduction(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

/**
 * A custom hook that wraps the `useDispatch` hook from `react-redux`,
 * and provides the `AppDispatch` type as a type parameter.
 *
 * @returns {AppDispatch} The dispatch function of the Redux store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A custom hook that wraps the `useSelector` hook from `react-redux`,
 * and provides the `RootState` type as a type parameter.
 *
 * @returns {TypedUseSelectorHook<RootState>} A selector function that selects a value from the store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
