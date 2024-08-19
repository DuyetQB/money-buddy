import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import listDataTasks from './data';
import themeMode  from './theme';


export const store = configureStore({
  reducer: {
    listDataTasks:listDataTasks,
    themeMode:themeMode
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
