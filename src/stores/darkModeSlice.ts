import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: localStorage.getItem("@astenir.isDark") === "true",
};

export const darkModeSlice = createSlice({
  name: "@astenir.isDark",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("@astenir.isDark", action.payload.toString());
      state.value = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => {
  if (localStorage.getItem("@astenir.isDark") === null) {
    localStorage.setItem("@astenir.isDark", "false");
  }

  return state.darkMode.value;
};

export default darkModeSlice.reducer;
