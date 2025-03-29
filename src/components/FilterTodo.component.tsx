import { useDispatch } from "react-redux";
import { setSearchQuery, setStatus } from "../store/slices/filter.slice";

export default function FilterTodList() {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search tasks by title"
        className="p-2 rounded-md border w-full my-4"
      />
      <div className="flex justify-end my-2">
        <div className="flex gap-2">
          <p className="text-[1.2em] font-light">Filter tasks:</p>
          <select
            onChange={(e) =>
              dispatch(
                setStatus(e.target.value as "all" | "completed" | "pending")
              )
            }
            className="border rounded-md p-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
