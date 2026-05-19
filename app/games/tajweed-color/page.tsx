'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TajweedColorGame } from '@/components/games/tajweed-color-game';

export default function TajweedColorPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-6">
      <TajweedColorGame onComplete={() => router.push('/games')} />
    </div>
  );
}
