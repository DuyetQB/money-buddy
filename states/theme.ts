import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  requestThemeMode: {
    date: '',
    note: '',
    money: 0,
    category: ''
  }
};

export const themeMode = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    setRequestThemeMode: (state:any, action:any):any => {
      state.requestThemeMode = action.payload;
    },
  },
});

export const { setRequestThemeMode } = themeMode.actions;
export const requestThemeMode = (state: RootState) => state.themeMode.requestThemeMode;
export default themeMode.reducer;