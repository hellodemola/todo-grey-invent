import CreateTodoList from "./components/CreateTodoList.component";
import FilterTodList from "./components/FilterTodo.component";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1>Grey invent</h1>
      <CreateTodoList />
      <FilterTodList />
      <TodoList />
    </>
  );
}

export default App;
