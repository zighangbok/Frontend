'use client';

import { useState } from 'react';
import LoginForm from '@/components/join/login-form';
import RegisterForm from '@/components/join/register-form';

export default function Join() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="relative w-full overflow-visible md:mx-auto md:max-w-screen-lg md:px-10">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-10 md:gap-[50px]">
        <div className="flex flex-col items-center md:gap-5">
          <div className="text-xl font-semibold md:text-4xl">
            <span className="text-primary">내 직군의 채용 공고</span>를 매일
            받아보세요
          </div>
          <div className="text-label-neutral text-sm md:text-xl">
            오늘 올라온 채용공고 10개를 매일 아침 이메일로 보내드립니다
          </div>
        </div>
        {isLogin ? (
          <LoginForm onSwitch={toggleForm} />
        ) : (
          <RegisterForm onSwitch={toggleForm} />
        )}
      </div>
    </div>
  );
}
