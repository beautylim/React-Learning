import { request } from "../utils";
export const loginAPI = (form) => {
    return request({
        url: "auth/login",
        method: "POST",
        data: form
    });
};
export const getUserProfileAPI = () => {
    return request({
        url: "auth/user/profile",
        method: "GET"
    });
};
