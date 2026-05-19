'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArabicWhiteboard } from '@/components/games/ArabicWhiteboard';

export default function ArabicWhiteboardPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-6">
      <ArabicWhiteboard onBack={() => router.push('/games')} />
    </div>
  );
}
