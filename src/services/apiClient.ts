import axios from 'axios';
import type { AxiosError } from 'axios';

// Get base URL from environment variables, fallback to development localhost if not found
const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:44383';

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

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('companyId');
      }
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error: no se pudo conectar al servidor');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout: la solicitud tardó demasiado');
    }
    return Promise.reject(error);
  }
);
