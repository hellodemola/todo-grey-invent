import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/theme.slice";
import { RootState } from "../store/store";

export default function DarkModeToggle() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg  transition"
      style={
        isDark
          ? {
              background: "white",
              color: "#112240",
              border: "3px dotted white",
            }
          : {
              border: "2px solid #112240",
            }
      }
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
