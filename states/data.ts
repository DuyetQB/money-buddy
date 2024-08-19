import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  requestListDataTasks: {
    date: '',
    note: '',
    money: 0,
    category: '',
    spent:1
  }
};

export const listDataTasks = createSlice({
  name: "listDataTasks",
  initialState,
  reducers: {
    setRequestDataTasks: (state:any, action:any):any => {
      console.log("action.payload:",action.payload);
      
      state.requestListDataTasks = action.payload;
    },
    setResetAllDataTasks: (state:any):any => {
      state.requestListDataTasks = null
    },
  },
});

export const { setRequestDataTasks, setResetAllDataTasks } = listDataTasks.actions;
export const requestLisDataTasks = (state: RootState) => state.listDataTasks.requestListDataTasks;
export default listDataTasks.reducer;