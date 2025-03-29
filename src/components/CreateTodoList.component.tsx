import { useState } from "react";
import TaskCreateComp from "./TaskCreate.component";
import { useAddTodoMutation } from "../services/todo.api";

export default function CreateTodoList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [createTodo] = useAddTodoMutation();
  const handleCreateTask = async (title: string) => {
    setShowAddForm(false);
    await createTodo({ title, completed: false }).unwrap();
  };

  return (
    <div>
      {!showAddForm ? (
        <button onClick={() => setShowAddForm(true)} type="button">
          Add a new task
        </button>
      ) : (
        <div>
          <TaskCreateComp
            handleCanel={() => setShowAddForm(false)}
            handleEdit={handleCreateTask}
          />
        </div>
      )}
    </div>
  );
}
