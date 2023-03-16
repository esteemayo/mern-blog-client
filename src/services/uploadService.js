import http from './httpService';

const apiEndPoint = '/upload';

export const upload = (data) => http.post(apiEndPoint, data);
