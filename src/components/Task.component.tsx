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
    <div className="flex gap-4 items-center border-b-2">
      <div>
        <input
          type="checkbox"
          onChange={() => handleUpdateStatus(!completed)}
          defaultChecked={completed}
          className="w-8 h-8"
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
