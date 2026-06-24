import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./modules/tokenStore";
import userInfoReducer from "./modules/userInfoStore";


const store = configureStore({
  reducer: {
    token: tokenReducer,
    userInfo: userInfoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store