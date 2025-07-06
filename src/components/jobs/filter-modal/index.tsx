'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { FILTER_OPTIONS } from '@/data/job-filter-options';
import { RefreshCw, X } from 'lucide-react';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  onChange: (type: string, values: string[]) => void;
  onReset: () => void;
  count?: number;
}

export default function FilterModal({
  open,
  onClose,
  selectedFilters,
  onChange,
  onReset,
  count = 0,
}: FilterModalProps) {
  const toggleOption = (type: string, value: string) => {
    const current = selectedFilters[type] || [];
    if (current.includes(value)) {
      onChange(
        type,
        current.filter((v) => v !== value),
      );
    } else {
      onChange(type, [...current, value]);
    }
  };

  const [experienceRange, setExperienceRange] = useState([0, 10]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
      >
        {/* 상단 헤더 (고정) */}
        <div className="sticky top-0 z-10 flex items-center justify-center border-b bg-white py-3">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">필터</DialogTitle>
          </DialogHeader>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-3 right-5 flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-100 active:bg-zinc-200"
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-10 px-5 py-5">
          {/* 나머지 필터 */}
          {Object.entries(FILTER_OPTIONS).map(([type, options]) => (
            <div key={type} className="flex flex-col gap-4">
              {/* 타입 라벨 */}
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold">{type}</div>
                <div className="text-xs text-[#999999]">중복 선택 가능</div>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleOption(type, option)}
                    className={cn(
                      'cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium',
                      selectedFilters[type]?.includes(option)
                        ? 'text-primary border-violet-500 bg-violet-100'
                        : 'border-gray-300 text-[#171717]',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* 학력조건 뒤에 경력조건 슬라이더 삽입 */}
              {type === '학력조건' && (
                <div className="relative mt-6 mb-10 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-bold">경력 조건</div>
                    <div className="text-xs text-[#999999]">중복 선택 가능</div>
                  </div>

                  {/* 전체 버튼 */}

                  <div>
                    <button
                      onClick={() => setExperienceRange([0, 10])}
                      className="text-primary rounded-lg border border-violet-500 bg-violet-100 px-4 py-3 text-sm font-medium"
                    >
                      전체
                    </button>
                  </div>

                  {/* 슬라이더 */}
                  <div>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      value={experienceRange}
                      onValueChange={(val) => setExperienceRange(val)}
                      className="w-1/2 text-violet-500"
                    />

                    {/* 핸들 아래 레이블 */}
                    <div
                      className="absolute bottom-[-30px] text-[16px] font-medium"
                      style={{
                        left: `calc(${(experienceRange[0] / 10) * 50}% - 8px )`,
                      }}
                    >
                      {experienceRange[0] === 0
                        ? '신입'
                        : `${experienceRange[0]}년`}
                    </div>
                    {experienceRange[0] !== experienceRange[1] && (
                      <div
                        className="absolute bottom-[-30px] text-[16px] font-medium"
                        style={{
                          left: `calc(${(experienceRange[1] / 10) * 50}% - 16px )`,
                        }}
                      >
                        {experienceRange[1] === 10
                          ? '10년+'
                          : `${experienceRange[1]}년`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="h-[200px]" />

        <div className="sticky bottom-0 z-10 box-border flex items-center gap-5 border-t bg-white px-5 py-4">
          <Button
            variant="outline"
            onClick={onReset}
            className="h-auto flex-shrink-0 px-5 py-4 text-[16px] font-bold"
          >
            <RefreshCw />
            초기화
          </Button>
          <Button
            onClick={onClose}
            className="bg-primary h-auto flex-1 px-5 py-4 text-[16px] font-bold text-white"
          >
            {count.toLocaleString()}개 공고 보기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
