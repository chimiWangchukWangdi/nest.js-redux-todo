import { TodoModel } from "@/model";
import { useAppDispatch } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import style from "../stylesheets/card.module.css";
import { useRouter } from "next/router";

/**
 * React functional component that represents the view of a todo card.
 *
 * @param {Object} props - The component props.
 * @param {TodoModel} props.item - An object of type TodoModel that contains properties such as "title", "priority", "description", and "completed".
 *
 * @returns {JSX.Element} - A React component that renders a card with todo information and buttons for editing and deleting.
 */
const CardView = ({ item }: { item: TodoModel }) => {

  /**
   * The Redux dispatch function that allows the component to dispatch actions to the store.
   *
   * @type {Function}
   */
  const dispatch = useAppDispatch();

  /**
   * The Next.js router object that allows the component to handle navigation and redirection.
   *
   * @type {Object}
   */
  const router = useRouter();

  /**
   * Asynchronous function that dispatches a deleteTodo action with the todo's ID when the user clicks on the "Delete" button.
   *
   * @param {string} id - The ID of the todo to be deleted.
   *
   * @returns {Promise<void>} - A promise that resolves when the deleteTodo action is completed.
   */
  const deleteTodo = async (id: string) => {
    await dispatch(todoActions.deleteTodo(id)).unwrap();
  };
  return (
    <div className={style.cardContainer}>
      <div className={style.cardHeader}>
        <p className={style.cardTitle}>Title: {item?.title}</p>
        <p>Priority: {item?.priority}</p>
      </div>
      <p className={style.cardBody}>Description: {item?.description}</p>
      <p className={style.cardBody}>Completed: {item?.completed}</p>
      <div className={style.buttonContainer}>
      <button
          className={style.buttonEdit}
          onClick={() => router.push("/edit-todo/" + item?.id)}
        >
          Edit
        </button>
        <button
          className={style.buttonDelete}
          onClick={() => deleteTodo(item?.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardView;
