import http from './httpService';

export function upload(data) {
  return http.post('/upload', data);
}
