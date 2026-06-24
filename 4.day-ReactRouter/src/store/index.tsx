import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/billStore";

const store = configureStore({
  reducer: {
    bill: billReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store