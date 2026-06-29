import { request } from "../utils";
export const getMyArticlesApi = (params) => {
    return request.get('/article/my', { params });
};
export const deleteArticleApi = (id) => {
    return request.delete(`/article/${id}`);
};
export const publishArticleApi = (data) => {
    return request.post('/article/publish', data);
};
export const updateArticleApi = (data) => {
    return request.put(`/article/${data.id}`, data);
};
export const getArticleByIdApi = (id) => {
    return request.get(`/article/${id}`);
};
