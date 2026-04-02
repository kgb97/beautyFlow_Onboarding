import axios from 'axios';

// Get base URL from environment variables, fallback to development localhost if not found
const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:44383/';

/**
 * Main Axios instance configured with the Base URL.
 * Ready to be used by all specific API service modules.
 */
export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Optionally, you can adjust timeout limits
  timeout: 15000, 
});

/**
 * Example of Request Interceptor
 * Useful for attaching authentication tokens (JWT) to all requests automatically.
 */
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Example of Response Interceptor
 * Useful for general error handling globally (like 401 Unauthorized or 403 Forbidden).
 */
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code outside 2xx triggers this function
    // Example: Redirect to login if user session expired
    // if (error.response?.status === 401) {
    //     console.error('Unauthorized access. Redirecting...');
    // }
    return Promise.reject(error);
  }
);
