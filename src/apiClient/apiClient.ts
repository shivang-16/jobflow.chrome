import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
