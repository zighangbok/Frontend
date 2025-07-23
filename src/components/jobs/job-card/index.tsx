'use client';

import { useRouter } from 'next/navigation';
import { Bookmark, Eye } from 'lucide-react';
import { SimpleRecruit } from '@/types/recruit';
import { handleJobCardClick } from '@/utils/clickTracker';

// 기업 이미지가 없을 시 랜덤으로 색상 배정
const tagColors = [
  '#4CAF50',
  '#FF7043',
  '#2196F3',
  '#9C27B0',
  '#66BB6A',
  '#AB47BC',
];

function getRandomColor() {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
}

export default function JobCard({
  companyName,
  title,
}: Omit<SimpleRecruit, 'color'>) {
  const tagColor = getRandomColor();
  const router = useRouter();

  const handleClick = () => {
    handleJobCardClick();

    router.push('/blank');
  };

  return (
    <div
      onClick={handleClick}
      className="mx-4 flex h-[120px] w-full flex-[1_0_0] cursor-pointer items-center gap-2 rounded-[24px] border border-[#EDEDED] shadow-[0px_4px_30px_0px_#00000008] transition-shadow hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)] md:mx-0 md:h-[164px] md:pl-[20px]"
    >
      {/* 좌측 영역(공고 정보) */}
      <div className="flex flex-1 flex-row items-center gap-2.5 md:gap-6">
        {/* 왼쪽 로고 영역 */}
        <div
          className="relative ml-2 flex aspect-[1/1] w-[60px] flex-shrink-0 items-center justify-center rounded-xl text-center text-[11px] leading-[14px] font-bold whitespace-pre-line text-white md:ml-0 md:w-[80px] md:rounded-2xl md:text-base md:leading-[18px]"
          style={{ backgroundColor: tagColor }}
        >
          {companyName.slice(0, 2)}
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-[6px] md:gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium text-[#71717A]">{companyName}</span>
          </div>

          <div className="line-clamp-2 max-w-[240px] text-xl font-semibold md:max-w-[356px]">
            {title}
          </div>

          <div className="flex flex-wrap items-center gap-1 text-base font-medium text-[#71717A] md:text-sm">
            <span>경력 무관</span>
            <span>·</span>
            <span>정규직</span>
            <span>·</span>
            <span />
            <span>·</span>
            <span>서울</span>
            <div className="mr-2.5 ml-2.5 h-4 w-[1.5px] shrink-0 bg-[#EDEDED]" />
            <div className="flex items-center gap-1">
              <Eye size={20} />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 영역(북마크 + 공고 상태) */}
      <div className="flex h-full w-[84px] flex-col items-center justify-center border-l border-[#EDEDED]">
        {/* 북마크 아이콘 (우측 상단) */}
        <div className="flex h-full cursor-pointer items-center justify-center text-gray-300">
          <Bookmark size={20} />
        </div>

        <div className="h-[1px] w-full bg-[#EDEDED]" />

        <div className="mx-2 flex h-full items-center justify-center text-center text-lg font-medium break-keep">
          상시
        </div>
      </div>
    </div>
  );
}
