import type { TokenResponse } from "../store/modules/tokenStore";
import type { UserInfo } from "../store/modules/userInfoStore";
export declare const loginAPI: (form: {
    username: string;
    telCode: string;
    loginType: string;
}) => Promise<import("axios").AxiosResponse<TokenResponse, any, {}>>;
export declare const getUserProfileAPI: () => Promise<import("axios").AxiosResponse<UserInfo, any, {}>>;
