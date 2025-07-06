'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';

const FILTERS = [
  '플랫폼',
  '직무',
  '네카라쿠배.. 공고만',
  '채용 유형',
  '학력 조건',
  '경력 조건',
  '지역',
  '마감 유형',
];

interface Props {
  onOpenFilter: (type: string) => void;
  activeFilter?: string;
}

export default function SlideFilterBar({ onOpenFilter, activeFilter }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="flex w-full items-center gap-2 overflow-hidden px-4 md:px-10">
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 bg-violet-100 md:h-11 md:w-11"
        >
          <Image
            src="/icons/refresh.svg"
            alt="refresh"
            width={24}
            height={24}
          />
        </Button>

        <div className="mx-1 h-7 w-[1.5px] shrink-0 bg-[#EDEDED] md:mx-2" />

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 bg-violet-100 md:h-11 md:w-11"
        >
          <SlidersHorizontal width={24} height={24} className="text-primary" />
        </Button>
      </div>

      <div
        className="scrollbar-hide flex gap-2 overflow-x-auto py-2"
        ref={scrollRef}
      >
        {FILTERS.map((filter) => (
          <Button
            key={filter}
            variant="outline"
            className={cn(
              'h-auto text-[16px] font-semibold whitespace-nowrap',
              activeFilter === filter &&
                'text-primary border border-violet-500 bg-violet-50',
            )}
            onClick={() => onOpenFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
