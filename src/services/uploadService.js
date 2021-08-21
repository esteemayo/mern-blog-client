import http from './httpService';

const apiEndPoint = '/upload';

export function upload(data) {
  return http.post(apiEndPoint, data);
};
