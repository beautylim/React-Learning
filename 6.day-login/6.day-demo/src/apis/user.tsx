
import type { TokenResponse } from "../store/modules/tokenStore"
import { request } from "../utils"

export const loginAPI = (form: { username: string, telCode: string, loginType: string }): Promise<TokenResponse> => {
  return request({
    url: "auth/login",
    method: "POST",
    data: form
  })
}

export const getUserProfileAPI = () => {
  return request({
    url: "auth/user/profile",
    method: "GET"
  })
}