import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoReducer, TODO_FEATURE_KEY } from "./todoSlice/todo.reducer";

const isProduction = () => process.env.NODE_ENV === "production";

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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
