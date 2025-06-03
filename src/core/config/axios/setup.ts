import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = globalThis.localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.reject(error.response.data)
);

export default axiosInstance;
