import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counterStore"
import channelReducer from "./modules/channelStore"
import foodReducer from "./modules/takeaway"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
    foods: foodReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store