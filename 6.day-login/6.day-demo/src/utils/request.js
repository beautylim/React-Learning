// axios 封装处理
import axios from "axios";
import { clearToken, getToken } from "./token";
import router from "../Router";
// 1. 根域名
// 2. 超时时间
const request = axios.create({
    baseURL: "http://localhost:8440",
    timeout: 5000
});
// 3. 请求拦截器
request.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// 响应拦截器
request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.dir(error);
    if (error.response.status === 401) {
        clearToken();
        router.navigate("/login");
        window.location.reload();
    }
    else {
        return Promise.reject(error);
    }
});
export { request };
