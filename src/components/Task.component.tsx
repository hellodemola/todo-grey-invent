import { useState } from "react";
import { ITodo } from "../interfaces/todo.interface";
import TaskEditComp from "./TaskEdit.component";
import { TaskViewComp } from "./TaskView";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../services/todo.api";

export default function TaskComp({ title, completed, id }: ITodo) {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleUpdateTitle = async (updateTitle: string) => {
    setIsEdit(false);
    await updateTodo({ id, title: updateTitle }).unwrap();
  };

  const handleUpdateStatus = async (status: boolean) => {
    await updateTodo({ id, completed: status });
  };

  const handleDeleteId = async () => await deleteTodo(id);

  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
      <div>
        <input
          type="checkbox"
          onChange={() => handleUpdateStatus(!completed)}
          defaultChecked={completed}
        />
      </div>
      {isEdit ? (
        <TaskEditComp
          handleEdit={handleUpdateTitle}
          handleCanel={() => setIsEdit(false)}
          title={title}
        />
      ) : (
        <TaskViewComp
          handleEdit={() => setIsEdit(true)}
          handleDelete={handleDeleteId}
          title={title}
        />
      )}
    </div>
  );
}
