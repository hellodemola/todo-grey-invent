import { FixedSizeList as List, ListChildComponentProps } from "react-window";
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
    <List height={500} itemCount={todos.length} itemSize={50} width="100%">
      {({ index, style }: ListChildComponentProps) => {
        const todo: ITodo = todos[index];
        if (!todo) return null;
        return (
          <div style={style}>
            <TaskComp {...todo} />
          </div>
        );
      }}
    </List>
  );
}
