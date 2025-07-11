import { axiosInstance } from '@/lib/axios';
import { AuthRequest } from '@/types/join';

// 로그인
export async function login({ userId, password }: AuthRequest) {
  const res = await axiosInstance.post('/api/users/login', {
    userId,
    password,
  });
  return res.data;
}

// 회원가입
export async function signup({ userId, password }: AuthRequest) {
  const res = await axiosInstance.post('/api/users/signup', {
    userId,
    password,
  });
  return res.data;
}
