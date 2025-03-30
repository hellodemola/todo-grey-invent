import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useSelector } from "react-redux";
import { ITodo } from "../interfaces/todo.interface";
import { useGetTodosQuery } from "../services/todo.api";
import TaskComp from "./Task.component";
import { selectFilteredTodos } from "../store/selectors/filter.selector";
import useItemSize from "../hooks/useItemSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  const { isLoading } = useGetTodosQuery(undefined);
  const todos = useSelector(selectFilteredTodos);
  const itemSize = useItemSize();

  if (isLoading && todos.length < 1)
    return (
      <div className="flex justify-center">
        <FontAwesomeIcon icon={faSpinner} size="2xl" />
        ...loading
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
