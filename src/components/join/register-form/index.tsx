'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { signup } from '@/apis/join';
import { toast } from 'sonner';

interface RegisterFormProps extends React.ComponentProps<'form'> {
  onSwitch: () => void;
}

export default function RegisterForm({
  onSwitch,
  ...props
}: RegisterFormProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({ userId, password });
      toast.success('회원가입 성공');
      onSwitch();
    } catch (error) {
      console.error(error);
      toast.error('회원가입 실패. 잠시후 다시 시도해주세요');
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
            placeholder="m@example.com"
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
          onClick={handleSignUp}
        >
          회원가입
        </Button>
      </div>
      <div className="text-center text-sm">
        이미 계정이 있으신가요?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="cursor-pointer underline underline-offset-4"
        >
          로그인
        </button>
      </div>
    </form>
  );
}
