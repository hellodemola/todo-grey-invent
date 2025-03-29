import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/theme.slice";

export default function ToggleSwitch() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span style={isDark ? { color: "white" } : {}} className="text-gray-600">
        {isDark ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </span>
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDark}
        onClick={() => dispatch(toggleTheme())}
      />
      {/* Toggle track */}
      <div className="relative w-14 h-7 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all">
        {/* Toggle knob */}
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
            isDark ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
}
