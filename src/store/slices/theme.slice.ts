import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: typeof window !== "undefined" && localStorage.getItem("theme") === "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");

      // Apply or remove "dark" class on <html> element
      if (typeof window !== "undefined") {
        if (state.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;