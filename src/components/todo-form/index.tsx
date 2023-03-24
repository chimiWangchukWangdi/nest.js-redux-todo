import { TodoModel, TodoPriority } from "@/model";
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
    const payload: TodoModel = {
      ...values,
      completed: "in progress",
      priority: TodoPriority.LOW,
      createdAt: new Date().toString(),
    };
    await dispatch(
      todoActions[isEditMode ? "updateTodo" : "createTodo"](payload)
    ).unwrap();
    router.push("/");
  };

  return (
    <div>
      <div className={style.todoTitle}>
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
                    <div className="input-group mb-3">
                      <label className="input-group-text" id="basic-addon2">
                        Title
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        {...input}
                        placeholder="Title"
                      />
                    </div>
                    {meta.touched && meta.error && (
                      <div className="mb-2">{meta.error}</div>
                    )}
                  </div>
                )}
              />
              <Field
                name="priority"
                render={({ input, meta }) => (
                  <div>
                    <div className="input-group mb-3">
                      <label className="input-group-text">Priority</label>
                      <input
                        className="form-control"
                        placeholder="priority"
                        type="text"
                        {...input}
                      />
                    </div>
                    {meta.touched && meta.error && (
                      <div className="mb-2">{meta.error}</div>
                    )}
                  </div>
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <div>
                    <div className="input-group mb-3">
                      <label className="input-group-text">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="description"
                        {...input}
                      />
                    </div>
                    {meta.touched && meta.error && (
                      <div className="mb-2">{meta.error}</div>
                    )}
                  </div>
                )}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
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
