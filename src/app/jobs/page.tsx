'use client';

import Header from '@/components/header';
import TabMenu from '@/components/jobs/tab-menu';
import JobCard from '@/components/jobs/job-card';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import FilterModal from '@/components/jobs/filter-modal';
import { recruitList } from '@/data/dummy-recruit';
import { SimpleRecruit } from '@/types/recruit';
import { getRecruitmentSimpleList } from '@/apis/recruit';

// 정렬 옵션 타입 및 레이블
type SortOption =
  | 'recommend'
  | 'latest'
  | 'oldest'
  | 'viewsDesc'
  | 'viewsAsc'
  | 'closingSoon'
  | 'closingLater';

const SORT_LABELS: Record<SortOption, string> = {
  recommend: '직행 추천 순',
  latest: '최신 등록 순',
  oldest: '오래된 등록 순',
  viewsDesc: '조회수 높은 순',
  viewsAsc: '조회수 낮은 순',
  closingSoon: '마감 임박 순',
  closingLater: '마감 여유 순',
};

// D-day 파싱 함수
const parseDday = (dDay?: string): number => {
  if (!dDay) return Infinity;
  if (dDay.startsWith('D-')) return parseInt(dDay.slice(2));
  if (dDay.startsWith('D+')) return 999 + parseInt(dDay.slice(2));
  return Infinity;
};

export default function Jobs() {
  const [sortOption, setSortOption] = useState<SortOption>('recommend');
  const [recruits, setRecruits] = useState<SimpleRecruit[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  // 데이터 로드
  const loadMore = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const newRecruits = await getRecruitmentSimpleList(page);
      setRecruits((prev) => [...prev, ...newRecruits]);
      setPage((prev) => prev + 1);
    } finally {
      setIsFetching(false);
    }
  }, [page, isFetching]);

  // 무한 스크롤 인터섹션 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // 페이지 진입 시 1회 호출
  useEffect(() => {
    loadMore();
  }, []);

  const sortedList = useMemo(() => {
    const list = [...recruitList];

    switch (sortOption) {
      case 'viewsDesc':
        return list.sort((a, b) => b.views - a.views);
      case 'viewsAsc':
        return list.sort((a, b) => a.views - b.views);
      case 'closingSoon':
        return list
          .filter((item) => item.status === '디데이')
          .sort((a, b) => parseDday(a.dDay) - parseDday(b.dDay));
      case 'closingLater':
        return list
          .filter((item) => item.status === '디데이')
          .sort((a, b) => parseDday(b.dDay) - parseDday(a.dDay));
      case 'oldest':
        return list.reverse(); // 단순히 역순 (등록일 없으므로 가정)
      case 'latest':
        return list; // 최신순 (현재 순서 유지)
      case 'recommend':
      default:
        return list;
    }
  }, [sortOption]);

  const handleChangeFilter = (type: string, values: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: values }));
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div>
      <Header />

      <div className="relative mt-6 w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
        <TabMenu />
      </div>

      <div className="mt-6 px-10">
        {/*<SlideFilterBar*/}
        {/*  onOpenFilter={() => setFilterModalOpen(true)}*/}
        {/*  activeFilter={undefined}*/}
        {/*/>*/}

        <div className="relative w-full overflow-visible md:mx-auto md:max-w-screen-xl md:px-10">
          {/* 상단 필터/정렬 UI */}
          <div className="flex w-full flex-col justify-between text-lg font-semibold text-[#363636] md:flex-row md:pt-0 md:pb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                총{' '}
                <span className="ml-2 text-[#7951FF]">{sortedList.length}</span>
                건
              </div>

              <div className="mr-2.5 ml-2.5 h-4 w-[1.5px] shrink-0 bg-[#EDEDED]" />

              <div className="flex items-center gap-2">
                오늘 공고만
                <Switch className="cursor-pointer" />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex min-w-[132px] cursor-pointer items-center gap-2 rounded-lg px-0 py-3 text-[#7D7D7D] hover:bg-transparent focus:ring-0 focus:outline-none"
              >
                <Button variant="ghost" className="gap-1 text-lg font-semibold">
                  <Image
                    src="/icons/sort.svg"
                    alt="sort"
                    width={24}
                    height={24}
                  />
                  {SORT_LABELS[sortOption]}
                  <Image
                    src="/icons/expand-more.svg"
                    alt="expand-more"
                    width={16}
                    height={16}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortOption(key)}
                    className={cn(
                      'py-2 text-sm font-semibold',
                      sortOption === key && 'bg-gray-100',
                    )}
                  >
                    {SORT_LABELS[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="box-border flex w-full flex-grow flex-col items-start gap-2.5 px-4 pt-0 pb-10 lg:grid lg:grid-cols-2 lg:content-start lg:justify-between lg:gap-4 lg:px-0 lg:pt-0 lg:pb-12">
            {recruits.map((recruit, index) => (
              <JobCard key={index} {...recruit} />
            ))}
          </div>

          {/* 스크롤 감지 */}
          <div ref={observerRef} className="h-[1px] w-full"></div>
        </div>
      </div>

      {/* 필터 모달 */}
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        selectedFilters={selectedFilters}
        onChange={handleChangeFilter}
        onReset={handleResetFilters}
        count={sortedList.length}
      />
    </div>
  );
}
