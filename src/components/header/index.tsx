'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  // 헤더 좌측 메뉴
  const navMenu = [
    '채용 공고',
    '기업별',
    '오늘 공고',
    '공고 제보',
    '오픈 채팅',
    'API',
  ];

  return (
    <div className="relative z-10 box-border flex w-full flex-row items-center justify-between py-5 md:px-10 md:py-3">
      <div className="ml-3 flex items-center gap-5">
        <Image
          src="/icons/header-logo.svg"
          alt={'zinghang logo'}
          width={60.5}
          height={24}
          className="mr-4 h-[24px] w-[60.5px] flex-shrink-0 md:h-[40px] md:w-[76px] md:flex-shrink"
        />
        {navMenu.map((item) => (
          <div
            key={item}
            className="relative hidden cursor-pointer font-medium text-[#353535] sm:block"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 md:gap-6">
        <div className="flex w-full flex-1 items-center justify-center px-4 md:px-0">
          <div className="relative flex h-12 w-full items-center justify-between rounded-[12px] border-2 border-[#D7CBFF] bg-[#FFFFFF] py-4 pl-5 text-[#999999] md:h-auto md:max-w-md md:pl-7">
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              className="w-full bg-[#FFFFFF] text-start font-medium tracking-wide outline-none"
            />
            <div className="hover:bg-primary/10 active:bg-primary/30 flex h-6 w-6 cursor-pointer items-center rounded-full text-[#999999] md:mr-5">
              <Image
                src="/icons/search.svg"
                alt="search"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <div className="relative hidden cursor-pointer font-medium text-[#353535] sm:block">
          기업회원
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7a52ff26] hover:bg-purple-200 active:bg-purple-300">
          <User className="text-primary" />
        </div>

        {/*<button*/}
        {/*  onClick={() => router.push('/join')}*/}
        {/*  className="md:border-line ds-Button2-16sb flex min-h-8 cursor-pointer items-center justify-center px-2 font-semibold text-[#6F00B6] md:min-h-10 md:rounded-lg md:border md:px-4 md:py-[0px]"*/}
        {/*>*/}
        {/*  로그인/회원가입*/}
        {/*</button>*/}
      </div>
    </div>
  );
}
