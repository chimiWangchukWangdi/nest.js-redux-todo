import TodoForm from "@/components/todo-form";
import { useRouter } from "next/router";

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h2>Edit Todo</h2>
      <TodoForm isEditMode={true}></TodoForm>
    </div>
  );
};

export default EditTodo;
