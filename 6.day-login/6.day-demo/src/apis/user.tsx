
import type { TokenResponse } from "../store/modules/tokenStore"
import type { UserInfo } from "../store/modules/userInfoStore"
import { request } from "../utils"

export const loginAPI = (form: { username: string, telCode: string, loginType: string }) => {
  return request<TokenResponse>({
    url: "auth/login",
    method: "POST",
    data: form
  })
}

export const getUserProfileAPI = () => {
  return request<UserInfo>({
    url: "auth/user/profile",
    method: "GET"
  })
}