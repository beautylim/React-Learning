import { createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from ".."
import { clearToken } from "../../utils"
import { setToken as _setToken, getToken } from "../../utils"
import { loginAPI } from "../../apis/user"


interface TokenState {
  token: string
}

const initialState: TokenState = {
  token: getToken() || ""
}

const tokenStore = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    removeToken(state) {
      state.token = ""
      clearToken()
    }
  }
})

export interface TokenResponse {
  token: string
}
const { setToken, removeToken } = tokenStore.actions

const fetchToken = (form: { username: string, telCode: string, loginType: string }) => {
  return async (dispatch: AppDispatch) => {
    const res = await loginAPI(form)
    dispatch(setToken(res.token))
  }
}

export { fetchToken, removeToken }

const tokenReducer = tokenStore.reducer

export default tokenReducer
