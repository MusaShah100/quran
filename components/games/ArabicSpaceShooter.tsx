'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArabicSpaceShooter as Game } from '../../app/games/ArabicSpaceShooter/arabic-space-shooter';

export function ArabicSpaceShooter() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreElRef = useRef<HTMLSpanElement>(null);
  const comboElRef = useRef<HTMLSpanElement>(null);
  const targetLetterElRef = useRef<HTMLSpanElement>(null);
  const restartBtnRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (
      canvasRef.current &&
      containerRef.current
    ) {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      const resizeCanvas = () => {
        if (!container || !canvas) return;
        const containerWidth = container.clientWidth;
        // More space for game - especially on mobile
        const containerHeight = window.innerHeight - (isMobile ? 80 : 100);
        const aspectRatio = 800 / 600;

        // Calculate scale to fit container while maintaining aspect ratio
        let scale = Math.min(
          (containerWidth - (isMobile ? 0 : 16)) / 800, // No padding on mobile to use full width
          containerHeight / 600,
          isMobile ? 3.0 : 1.5 // Even larger scale on mobile!
        );

        const width = 800 * scale;
        const height = 600 * scale;

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Recreate game if scale changes
        if (gameRef.current) {
          gameRef.current.destroy();
        }
        gameRef.current = new Game({
          canvas: canvas,
          scoreEl: scoreElRef.current,
          comboEl: comboElRef.current,
          targetLetterEl: targetLetterElRef.current,
          restartButton: restartBtnRef.current,
          scale: scale,
        });
        gameRef.current.start();
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        gameRef.current?.destroy();
      };
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col items-start justify-start min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 to-slate-950 p-4">
      {/* Header with Exit Button */}
      <div className="w-full max-w-[1000px] flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl md:text-3xl font-bold">Arabic Space Shooter</h1>
        <button
          onClick={() => router.push('/games')}
          className="bg-red-500/80 hover:bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all hover:scale-105 backdrop-blur-sm flex items-center gap-2 text-sm md:text-base"
        >
          ✕ Exit
        </button>
      </div>

      <div
        ref={containerRef}
        className="game-wrapper relative w-full max-w-[1000px] flex flex-col items-center mx-auto"
      >
        <canvas
          ref={canvasRef}
          id="gameCanvas"
          className="block rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl touch-none"
        />

        <div className={`hud flex ${isMobile ? 'flex-col gap-4' : 'justify-between'} items-center mt-4 px-2 w-full text-slate-300 font-semibold`}>
          <div className="hud-left flex items-center gap-4 md:gap-6">
            <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-6 py-3 md:py-3 rounded-full backdrop-blur-sm border border-white/10">
              <span className="icon text-xl md:text-2xl">⭐</span>
              <span ref={scoreElRef} id="scoreDisplay" className="value text-xl md:text-2xl min-w-[2.5rem] md:min-w-[3rem] text-center text-white font-variant-numeric tabular-nums">0</span>
              <span className="label text-xs md:text-sm uppercase tracking-widest text-slate-400">Points</span>
            </div>
            <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-6 py-3 md:py-3 rounded-full backdrop-blur-sm border border-white/10">
              <span className="icon text-xl md:text-2xl">🎯</span>
              <span ref={comboElRef} id="comboDisplay" className="value text-xl md:text-2xl min-w-[2.5rem] md:min-w-[3rem] text-center text-white font-variant-numeric tabular-nums">0</span>
              <span className="label text-xs md:text-sm uppercase tracking-widest text-slate-400">Combo</span>
            </div>
          </div>
          <div className="hud-right flex items-center gap-4 md:gap-6">
            <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-6 py-3 md:py-3 rounded-full backdrop-blur-sm border border-white/10">
              <span className="icon text-xl md:text-2xl">📖</span>
              <span ref={targetLetterElRef} id="letterDisplay" className="value text-2xl md:text-3xl min-w-[3rem] md:min-w-[3.5rem] text-center text-white font-variant-numeric tabular-nums">أ</span>
              <span className="label text-xs md:text-sm uppercase tracking-widest text-slate-400">Target</span>
            </div>
            <button
              ref={restartBtnRef}
              id="restartBtn"
              className="bg-white/5 border border-white/10 text-slate-300 px-6 md:px-8 py-3 md:py-3 rounded-full font-semibold cursor-pointer transition-all hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105 backdrop-blur-sm flex items-center gap-2 text-base md:text-lg"
            >
              ⟳ Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
