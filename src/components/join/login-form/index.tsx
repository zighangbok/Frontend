'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps extends React.ComponentProps<'form'> {
  onSwitch?: () => void;
}

export default function LoginForm({ onSwitch, ...props }: LoginFormProps) {
  const router = useRouter();

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
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" required className="h-12" />
        </div>
        <Button
          type="submit"
          className="h-12 w-full cursor-pointer"
          onClick={() => router.push('/jobs')}
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
