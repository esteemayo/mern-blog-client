import http from './httpService';

const apiEndPoint = '/posts';

const postUrl = (postId) => `${apiEndPoint}/${postId}`;

export const getPosts = (search, token) =>
  http.get(`/posts${search}`, { cancelToken: token });

export const getPost = (postId, token) =>
  http.get(postUrl(postId), { cancelToken: token });

export const getPostWithSlug = (slug, token) =>
  http.get(`${apiEndPoint}/details/${slug}`, { cancelToken: token });

export const createPost = (post) => http.post(apiEndPoint, post);

export const updatePost = (postId, post) =>
  http.patch(postUrl(postId), post);

export const deletePost = (postId) => http.delete(postUrl(postId));
