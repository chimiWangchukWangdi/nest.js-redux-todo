import TodoForm from "@/components/todo-form";

/**
 * This component renders a Create Todo page with a TodoForm component for creating new todos.
 * @returns JSX element displaying the create todo page.
 */
const CreateTodo = () => {
  return (
    <div>
      <h2>Create Todo</h2>
      <TodoForm isEditMode={false}></TodoForm>
    </div>
  );
};

export default CreateTodo;
