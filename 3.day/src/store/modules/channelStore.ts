import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { AppDispatch } from "../index"

interface ChannelState {
  channelList: string[]
}

const initialState: ChannelState = {
  channelList: []
}

const channelState = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<string[]>) {
      state.channelList = action.payload
    }
  }
})

const { setChannels } = channelState.actions

const fetchChannelList = () => {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get("http://localhost:3004/list")
    dispatch(setChannels(response.data))
  }
}

export { fetchChannelList }

const channelReducer = channelState.reducer

export default channelReducer