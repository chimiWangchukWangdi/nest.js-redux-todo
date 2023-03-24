import { TodoModel } from "@/model";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import { todoSelectors } from "@/state/todoSlice/todo.selectors";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../stylesheets/card.module.css";

const CardView = dynamic(import("../card-view"));

/**
 * Renders the TodoListing component which displays a list of todos.
 * The component fetches the todo entities from the state using selectors and
 * dispatches the fetchTodo action to retrieve the data.
 * Users can create a new todo by clicking the "Create Todo" button.
 * @returns JSX.Element
 */
const TodoListing = () => {
  const todoEntites = useAppSelector(todoSelectors.selectTodoEntities);
  const selectTodoIds = useAppSelector(todoSelectors.selectTodoIds);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    // Dispatch the fetchTodo action to retrieve the todo data
    dispatch(todoActions.fetchTodo());
  }, []);

  /**
   * Navigates to the "create-todo" route when the user clicks on the "Create Todo" button.
   * @returns void
   */
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
