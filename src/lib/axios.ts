import axios from 'axios';
import { getCookie } from 'cookies-next';

// 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
