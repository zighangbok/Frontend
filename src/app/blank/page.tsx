'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="text-4xl font-semibold">보아즈 화이팅</div>
      <Button onClick={() => router.push('/jobs')} size="lg">
        공고 페이지로 이동
      </Button>
    </div>
  );
}
