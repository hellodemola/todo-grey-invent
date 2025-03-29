import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeModal } from "../store/slices/modal.slice";
import TaskCreateComp from "./TaskCreate.component";
import { useAddTodoMutation } from "../services/todo.api";

export default function Modal() {
  const {
    modal: { isOpen },
    theme: { darkMode },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [createTodo] = useAddTodoMutation();
  const handleCreateTask = async (title: string) => {
    dispatch(closeModal());
    await createTodo({ title, completed: false }).unwrap();
  };

  if (!isOpen) return null; // Hide if modal is closed

  return (
    <div
      style={!darkMode ? darkStyle : lightStyle}
      className="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-10 z-1 flex justify-center items-center"
    >
      <div
        style={darkMode ? innerDarkStyle : innerLightStyle}
        className=" p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold">Create a new task</h2>
        <TaskCreateComp
          handleCanel={() => dispatch(closeModal())}
          handleEdit={handleCreateTask}
        />
      </div>
    </div>
  );
}

const darkStyle = {
  color: "rgba(255, 255, 255, 0.8)",
  background: "rgba(17, 34, 64, 0.3)",
};
const lightStyle = {
  color: "rgba(17, 34, 64, 0.8)",
  background: "rgba(255, 255, 255, 0.3)",
};

const innerDarkStyle = {
  color: "rgba(255, 255, 255, 0.8)",
  background: "rgba(17, 34, 64, 0.8)",
};
const innerLightStyle = {
  color: "rgba(17, 34, 64, 0.8)",
  background: "rgba(255, 255, 255, 0.8)",
};
