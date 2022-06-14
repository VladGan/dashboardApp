import { configureStore } from "@reduxjs/toolkit";
import machinesDataReducer from "./slices/machinesDataSlice";

export const store = configureStore({
  reducer: {
    machinesData: machinesDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
