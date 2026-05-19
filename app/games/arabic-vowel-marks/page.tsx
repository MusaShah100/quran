'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArabicVowelMarksGame } from '@/components/games/arabic-vowel-marks-game';

export default function ArabicVowelMarksPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-6">
      <ArabicVowelMarksGame onComplete={() => router.push('/games')} />
    </div>
  );
}
