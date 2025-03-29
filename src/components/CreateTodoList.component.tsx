import { useDispatch } from "react-redux";
import Modal from "./Modal.component";
import { openModal } from "../store/slices/modal.slice";

export default function CreateTodoList() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="border py-2 px-5 rounded-md cursor-pointer"
          onClick={() => dispatch(openModal())}
          type="button"
        >
          Add Task
        </button>
      </div>
      <Modal />
    </div>
  );
}
