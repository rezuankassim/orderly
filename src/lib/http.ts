import {router} from '@/router';
import {notFound} from '@tanstack/react-router';
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  // withCredentials: true,
  // withXSRFToken: true,
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      router.navigate({to: '/login'});
    }

    if (error.response?.status === 404) {
      throw notFound();
    }

    return Promise.reject(error);
  }
);

export default http;
