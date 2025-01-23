import axios from 'axios';
import getTokenFromBackground from '../actions/getCookie';

// Axios client setup
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Add token to Axios requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getTokenFromBackground();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
