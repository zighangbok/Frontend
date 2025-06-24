'use client';

import { useState } from 'react';

export default function TabMenu() {
  const tabMenu = ['전체 공고', '저장한 공고'];
  const [selectedTab, setSelectedTab] = useState('전체 공고');

  return (
    <div className="mt-0 flex space-x-4">
      {tabMenu.map((item) => (
        <button
          key={item}
          onClick={() => setSelectedTab(item)}
          className={`border-b-[3px] px-2 text-2xl leading-[3] font-semibold transition-colors ${selectedTab === item ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'} `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
