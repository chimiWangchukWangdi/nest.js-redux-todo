import { TodoCompleted, TodoModel, TodoPriority } from "@/model";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { todoActions } from "@/state/todoSlice/todo.actions";
import { todoSelectors } from "@/state/todoSlice/todo.selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import style from "../stylesheets/todo-form.module.css";

const TodoForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const selectTodoEntities = useAppSelector(todoSelectors.selectTodoEntities);
  const selectedTodo = useAppSelector(todoSelectors.selectedTodo);

  useEffect(() => {
    if (id && isEditMode && !selectTodoEntities[id as string]) {
      dispatch(todoActions.getTodoById(id as string));
    }
  }, [id]);

  const onSubmit = async (values: TodoModel) => {
    debugger;
    const payload: TodoModel = {
      ...values,
      createdAt: new Date().toString(),
    };
    await dispatch(
      todoActions[isEditMode ? "updateTodo" : "createTodo"](payload)
    ).unwrap();
    router.push("/");
  };

  return (
    <div>
      <div>
        <h3>Todo Form</h3>
      </div>
      <div className={style.todoForm}>
        <Form
          onSubmit={onSubmit}
          initialValues={
            isEditMode
              ? ((selectTodoEntities[id as string] ||
                  selectedTodo) as TodoModel)
              : {}
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
                      <textarea placeholder="description" {...input} />
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
              <button type="submit" disabled={submitting}>
                {isEditMode ? "Update" : "Submit"}
              </button>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default TodoForm;
