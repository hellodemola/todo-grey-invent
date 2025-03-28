import { useSelector } from "react-redux";
import { ITodo } from "../interfaces/todo.interface";
import { useGetTodosQuery } from "../services/todo.api";
import TaskComp from "./Task.component";
import { selectFilteredTodos } from "../store/selectors/filter.selector";

export default function TodoList() {
  const { error, isLoading } = useGetTodosQuery(undefined);
  const todos = useSelector(selectFilteredTodos);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div>
      {todos.length > 0 &&
        todos.map((todo: ITodo) => (
          <div key={todo.id}>
            <TaskComp
              id={todo.id}
              title={todo?.title}
              completed={todo?.completed}
            />
          </div>
        ))}
    </div>
  );
}
