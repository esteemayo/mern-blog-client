import http from './httpService';

const apiEndPoint = '/posts';

function postUrl(id) {
  return `${apiEndPoint}/${id}`;
};

export function getPosts(search) {
  return http.get(`/posts${search}`);
};

export function getPost(id) {
  return http.get(postUrl(id));
};

export function getPostWithSlug(slug) {
  return http.get(`${apiEndPoint}/details/${slug}`);
};

export function createPost(post) {
  return http.post(apiEndPoint, post);
};

export function updatePost(id, post) {
  return http.patch(postUrl(id), post);
};

export function deletePost(id) {
  return http.delete(postUrl(id));
};
