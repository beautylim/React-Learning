import { request } from "../utils";

export interface Article {
  id: string;
  title: string;
  status: number;
  cover?: {
    type: number;
    images: string[];
  };
  createTime: string;
  readCount: number;
  commentCount: number;
  likeCount: number;
  channelId: number;
  content?: string;
}

export interface ArticleQuery {
  status: number;
  channelId: number;
  startTime: string;
  endTime: string;
  pageNum: number;
  pageSize: number;
}

export interface ArticleListResponse {
  list: Article[];
  total: number;

}
export const getMyArticlesApi = (params: ArticleQuery) => {
  return request.get<ArticleListResponse>('/article/my', { params });
};

export const deleteArticleApi = (id: string) => {
  return request.delete(`/article/${id}`);
};

export const publishArticleApi = (data: any) => {
  return request.post('/article/publish', data);
};

export const updateArticleApi = (data: any) => {
  return request.put(`/article/${data.id}`, data);
};

export const getArticleByIdApi = (id: string) => {
  return request.get<Article>(`/article/${id}`);
};
