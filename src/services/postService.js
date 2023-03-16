import http from './httpService';
const apiEndPoint = '/posts';

const postUrl = (postId) => `${apiEndPoint}/${postId}`;

export const getPosts = (search) => http.get(`/posts${search}`);

export const getPost = (postId) => http.get(postUrl(postId));

export const getPostWithSlug = (slug) =>
  http.get(`${apiEndPoint}/details/${slug}`);

export const createPost = (post) => http.post(apiEndPoint, post);

export const updatePost = (postId, post) =>
  http.patch(postUrl(postId), post);

export const deletePost = (postId) => {
  return http.delete(postUrl(postId));
};
