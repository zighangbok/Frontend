'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterFormProps extends React.ComponentProps<'form'> {
  onSwitch?: () => void;
}

export default function RegisterForm({
  onSwitch,
  ...props
}: RegisterFormProps) {
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
        <Button type="submit" className="h-12 w-full cursor-pointer">
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
