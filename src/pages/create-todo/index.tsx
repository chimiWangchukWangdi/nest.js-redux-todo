import TodoForm from "@/components/todo-form";

const CreateTodo = () => {
  return (
    <div>
      <h2>Create Todo</h2>
      <TodoForm isEditMode={false}></TodoForm>
    </div>
  );
};

export default CreateTodo;
