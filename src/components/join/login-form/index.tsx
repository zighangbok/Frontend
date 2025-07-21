'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { login } from '@/apis/join';
import { toast } from 'sonner';

interface LoginFormProps extends React.ComponentProps<'form'> {
  onSwitch?: () => void;
}

export default function LoginForm({ onSwitch, ...props }: LoginFormProps) {
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ userId, password });
      toast.success('로그인 성공');

      // 로그인 성공시, 공고 페이지로 라우팅
      router.push('/jobs');
    } catch (error) {
      console.error(error);
      toast.error('로그인 실패. 잠시후 다시 시도해주세요');
    }
  };

  return (
    <form
      {...props}
      className="flex w-full flex-col items-center gap-2 px-7 md:gap-3 md:px-24"
    >
      <div className="grid w-full gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="zighangbok@example.com"
            required
            className="h-12"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            required
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="h-12 w-full cursor-pointer"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </div>
      <div className="text-center text-sm">
        계정이 없으신가요?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="cursor-pointer underline underline-offset-4"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
