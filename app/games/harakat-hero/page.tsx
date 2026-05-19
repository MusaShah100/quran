'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HarakatHeroGame } from '@/components/games/harakat-hero-game';

export default function HarakatHeroPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-6">
      <HarakatHeroGame onComplete={() => router.push('/games')} />
    </div>
  );
}
