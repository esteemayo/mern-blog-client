import http from './httpService';
const apiEndPoint = '/posts';

const postUrl = (id) => `${apiEndPoint}/${id}`;

export const getPosts = (search) => http.get(`/posts${search}`);

export const getPost = (id) => http.get(postUrl(id));

export const getPostWithSlug = (slug) => http.get(`${apiEndPoint}/details/${slug}`);

export const createPost = (post) => http.post(apiEndPoint, post);

export const updatePost = (id, post) => http.patch(postUrl(id), post);

export const deletePost = (id) => {
  return http.delete(postUrl(id));
};
