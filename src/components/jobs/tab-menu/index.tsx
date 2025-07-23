'use client';

type TabType = '전체 공고' | '추천 공고';

interface TabMenuProps {
  selectedTab: string;
  onChangeTab: (tab: TabType) => void;
}

export default function TabMenu({ selectedTab, onChangeTab }: TabMenuProps) {
  const tabMenu: TabType[] = ['전체 공고', '추천 공고'];

  return (
    <div className="mt-0 flex space-x-4">
      {tabMenu.map((item) => (
        <button
          key={item}
          onClick={() => onChangeTab(item)}
          className={`border-b-[3px] px-2 text-2xl leading-[3] font-semibold transition-colors ${selectedTab === item ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'} `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
