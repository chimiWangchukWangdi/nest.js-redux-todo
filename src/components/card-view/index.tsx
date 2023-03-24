import { TodoModel } from "@/model";
import { useAppDispatch } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import style from "../stylesheets/card.module.css";
import { useRouter } from "next/router";

const CardView = ({ item }: { item: TodoModel }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
          className={style.buttonDelete}
          onClick={() => deleteTodo(item?.id)}
        >
          Delete
        </button>
        <button
          className={style.buttonEdit}
          onClick={() => router.push("/edit-todo/" + item?.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CardView;
