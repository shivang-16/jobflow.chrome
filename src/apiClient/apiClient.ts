import axios from 'axios';

// Axios client setup
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to request token from background script
export function getTokenFromBackground() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'getToken' }, (response) => {
      console.log(response, "here is reonse")
      if (response && response.token) {
        resolve(response.token);
      } else {
        reject(response.error || 'Token not found.');
      }
    });
  });
}

// Add token to Axios requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getTokenFromBackground();
      console.log('otken', token)
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
