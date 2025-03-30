import { useSelector } from "react-redux";
import CreateTodoList from "./components/CreateTodoList.component";
import FilterTodList from "./components/FilterTodo.component";
import TodoList from "./components/TodoList";
import { RootState } from "./store/store";
import ToggleSwitch from "./components/ToggleSwitch.component";

function App() {
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <section
      style={isDark ? darkStyle : lightStyle}
      className="flex h-svh w-screen justify-center overflow-scroll"
    >
      <div className="lg:w-8/12 w-full px-6 lg:px-0">
        <div className="lg:flex justify-between">
          <h1 className="text-[2em] font-light my-2">
            Colloborative Todo List
          </h1>
          <ToggleSwitch />
        </div>
        <CreateTodoList />
        <FilterTodList />
        <TodoList />
      </div>
    </section>
  );
}

export default App;

const darkStyle = {
  color: "white",
  background: "#112240",
};
const lightStyle = {
  color: "#112240",
};
