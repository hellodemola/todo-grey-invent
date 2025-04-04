import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useSelector } from "react-redux";
import { ITodo } from "../interfaces/todo.interface";
import { useGetTodosQuery } from "../services/todo.api";
import TaskComp from "./Task.component";
import { selectFilteredTodos } from "../store/selectors/filter.selector";
import useItemSize from "../hooks/useItemSize";
import BeatLoader from "react-spinners/BeatLoader";

export default function TaskList() {
  const { isLoading } = useGetTodosQuery(undefined);
  const todos = useSelector(selectFilteredTodos);
  const itemSize = useItemSize();

  if (isLoading && todos.length < 1)
    return (
      <div className="flex justify-center">
        <BeatLoader aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );

  return (
    <List
      height={500}
      itemCount={todos.length}
      itemSize={itemSize}
      width="100%"
    >
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
