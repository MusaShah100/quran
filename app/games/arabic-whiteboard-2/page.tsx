'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArabicWhiteboard2 } from '@/components/games/ArabicWhiteboard2';

export default function ArabicWhiteboard2Page() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-6">
      <ArabicWhiteboard2 onBack={() => router.push('/games')} />
    </div>
  );
}
