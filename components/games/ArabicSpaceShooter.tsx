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
        const maxGameHeight = window.innerHeight * 0.7;
        const useHeight = isMobile ? (window.innerHeight - 120) : maxGameHeight;

        // Calculate scale to fit container while maintaining aspect ratio
        let scale = Math.min(
          (containerWidth - (isMobile ? 0 : 24)) / 800, // No padding on mobile to use full width
          useHeight / 600,
          isMobile ? 3.0 : 1.2 // Only big on mobile
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
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-2">
      {/* Header with Exit Button */}
      <div className="w-full max-w-[1200px] flex justify-between items-center mb-2">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-lg md:text-xl font-bold tracking-tight">
          🚀 Arabic Space Shooter
        </h1>
        <button
          onClick={() => router.push('/games')}
          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg font-semibold transition-all hover:scale-105 shadow-sm shadow-red-500/30 flex items-center gap-1 text-[9px] md:text-[10px] uppercase tracking-widest"
        >
          ✕ Exit
        </button>
      </div>

      <div
        ref={containerRef}
        className="game-wrapper relative w-full max-w-[1200px] flex flex-col items-center mx-auto"
      >
        {/* HUD above the canvas for better layout! */}
        <div className={`hud flex ${isMobile ? 'flex-col gap-2 mb-2' : 'justify-between'} items-center mb-2 px-2 w-full text-slate-200 font-semibold`}>
          <div className="hud-left flex items-center gap-1.5 md:gap-2">
            <div className="hud-item flex items-center gap-1.5 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg backdrop-blur-xl border border-cyan-400/20 shadow-md shadow-cyan-500/10">
              <span className="icon text-base md:text-lg">⭐</span>
              <span ref={scoreElRef} id="scoreDisplay" className="value text-base md:text-lg min-w-[2rem] md:min-w-[2.5rem] text-center text-white font-variant-numeric tabular-nums font-bold">0</span>
              <span className="label text-[9px] md:text-[10px] uppercase tracking-widest text-cyan-300">Points</span>
            </div>
            <div className="hud-item flex items-center gap-1.5 bg-gradient-to-br from-violet-900/30 to-purple-900/30 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg backdrop-blur-xl border border-violet-400/20 shadow-md shadow-violet-500/10">
              <span className="icon text-base md:text-lg">🎯</span>
              <span ref={comboElRef} id="comboDisplay" className="value text-base md:text-lg min-w-[2rem] md:min-w-[2.5rem] text-center text-white font-variant-numeric tabular-nums font-bold">0</span>
              <span className="label text-[9px] md:text-[10px] uppercase tracking-widest text-violet-300">Combo</span>
            </div>
          </div>
          <div className="hud-right flex items-center gap-1.5 md:gap-2">
            <div className="hud-item flex items-center gap-1.5 bg-gradient-to-br from-amber-900/30 to-orange-900/30 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg backdrop-blur-xl border border-amber-400/20 shadow-md shadow-amber-500/10">
              <span className="icon text-base md:text-lg">📖</span>
              <span ref={targetLetterElRef} id="letterDisplay" className="value text-lg md:text-xl min-w-[2.5rem] md:min-w-[3rem] text-center text-white font-variant-numeric tabular-nums font-bold">أ</span>
              <span className="label text-[9px] md:text-[10px] uppercase tracking-widest text-amber-300">Target</span>
            </div>
            <button
              ref={restartBtnRef}
              id="restartBtn"
              className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 hover:from-emerald-800/40 hover:to-green-800/40 text-white px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg font-semibold cursor-pointer transition-all hover:scale-105 backdrop-blur-xl border border-emerald-400/20 shadow-md shadow-emerald-500/10 flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-widest"
            >
              <span className="text-base md:text-lg">⟳</span>
              Restart
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          id="gameCanvas"
          className="block rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg shadow-cyan-500/20 touch-none"
        />
      </div>
    </div>
  );
}
