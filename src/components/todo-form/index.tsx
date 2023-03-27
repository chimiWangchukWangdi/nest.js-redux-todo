import { TodoCompleted, TodoModel, TodoPriority } from "@/model";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import { todoSelectors } from "@/state/todoSlice/todo.selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import style from "../stylesheets/todo-form.module.css";

/**
 * Represents a form component for creating and updating a to-do item.
 *
 * @param {object} props - The props object containing the isEditMode flag.
 * @param {boolean} props.isEditMode - The flag to indicate if the form is in edit mode.
 * @returns {JSX.Element} The TodoForm component.
 */
const TodoForm = ({ isEditMode }: { isEditMode?: boolean }) => {

  /**
   * The Redux dispatch hook.
   */
  const dispatch = useAppDispatch();

  /**
   * The Next.js router hook.
   */
  const router = useRouter();

  /**
   * The id of the to-do item being edited.
   */
  const { id } = router.query;

  /**
   * The selector hook to retrieve to-do entities.
   */
  const selectTodoEntities = useAppSelector(todoSelectors.selectTodoEntities);

  /**
   * The selector hook to retrieve the selected to-do item.
   */
  const selectedTodo = useAppSelector(todoSelectors.selectedTodo);

  /**
   * The effect hook to fetch the to-do item by id if in edit mode.
   */
  useEffect(() => {
    if (id && isEditMode && !selectTodoEntities[id as string]) {
      dispatch(todoActions.getTodoById(id as string));
    }
  }, [id]);

  /**
   * The form submission handler.
   *
   * @param {TodoModel} values - The form values as a TodoModel.
   * @returns {Promise<void>} A promise that resolves when the form is submitted.
   */
  const onSubmit = async (values: TodoModel) => {
    const payload: TodoModel = {
      ...values,
      createdAt: new Date().toString(),
    };
    await dispatch(
      todoActions[isEditMode ? "updateTodo" : "createTodo"](payload)
    ).unwrap();
    router.push("/");
  };

  /**
   * The cancel button click handler.
   *
   * @returns {void}
   */
  const handleCancel = (): void => {
    router.push("/");
  }

  return (
    <div>
      <div className={style.todoForm}>
        <Form
          onSubmit={onSubmit}
          initialValues={
            isEditMode
              ? ((selectTodoEntities[id as string] ||
                  selectedTodo) as TodoModel)
              : {
                  priority: TodoPriority.LOW,
                  completed: TodoCompleted.NO,
                }
          }
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="title"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Title</label>
                      <input type="text" {...input} placeholder="Title" />
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="priority"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Priority</label>
                      <select {...input}>
                        {Object.values(TodoPriority).map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Description</label>
                      <textarea
                        placeholder="description"
                        {...input}
                      />
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <Field
                name="completed"
                render={({ input, meta }) => (
                  <div>
                    <div>
                      <label>Completed</label>
                      <select {...input}>
                        {Object.values(TodoCompleted).map((completed) => (
                          <option key={completed} value={completed}>
                            {completed}
                          </option>
                        ))}
                      </select>
                    </div>
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              />
              <div className={style.buttonContainer}>
                <button type="submit" disabled={submitting}>
                  {isEditMode ? "Update" : "Submit"}
                </button>
                <button type="button" onClick={handleCancel}>
                 Cancel
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default TodoForm;
