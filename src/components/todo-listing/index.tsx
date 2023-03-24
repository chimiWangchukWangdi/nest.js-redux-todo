import { TodoModel } from "@/model";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import { todoSelectors } from "@/state/todoSlice/todo.selectors";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../stylesheets/card.module.css";

const CardView = dynamic(import("../card-view"));
const TodoListing = () => {
  const todoEntites = useAppSelector(todoSelectors.selectTodoEntities);
  const selectTodoIds = useAppSelector(todoSelectors.selectTodoIds);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(todoActions.fetchTodo());
  }, []);

  const navigateRoute = () => {
    router.push("/create-todo");
  };
  return (
    <div>
      <div className={style.buttonContainer}>
        <button className={style.buttonCreate} onClick={navigateRoute}>
          Create Todo
        </button>
      </div>
      <div className={style.listingContainer}>
        <h2>Todo Listing</h2>
        {selectTodoIds.map((id) => (
          <CardView key={id} item={todoEntites[id] as TodoModel}></CardView>
        ))}
      </div>
    </div>
  );
};

export default TodoListing;
