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
      />
      <div>
        <p>Filter tasks:</p>
        <select
          onChange={(e) =>
            dispatch(
              setStatus(e.target.value as "all" | "completed" | "pending")
            )
          }
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
