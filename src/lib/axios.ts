import axios from 'axios';
import { getCookie } from 'cookies-next';

// 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 쿠키에 토큰이 있다면 Authorization 헤더에 포함
    const token =
      typeof window !== 'undefined' ? getCookie('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
