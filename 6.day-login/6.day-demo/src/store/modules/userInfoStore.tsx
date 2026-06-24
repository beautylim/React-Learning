import { createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from ".."
import { getUserProfileAPI } from "../../apis/user";

interface UserInfo {
  userId: number;
  username: string;
  password: string;
  email: string;
  phone: string;
}

interface UserInfoState {
  userInfo: UserInfo
}
const emptyUserInfo = { userId: 0, username: "", password: "", email: "", phone: "" }
const initialState: UserInfoState = {
  userInfo: emptyUserInfo
}

const userInfoStore = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },

    clearUserInfo(state) {
      state.userInfo = emptyUserInfo
    }
  }
})


const { setUserInfo, clearUserInfo } = userInfoStore.actions

const fetchUserInfo = () => {
  return async (dispatch: AppDispatch) => {
    const res = await getUserProfileAPI()
    dispatch(setUserInfo(res))
  }

}

export { fetchUserInfo, clearUserInfo }

const userInfoReducer = userInfoStore.reducer

export default userInfoReducer
