'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArabicSpaceShooter as Game } from '../../app/games/ArabicSpaceShooter/arabic-space-shooter';

export function ArabicSpaceShooter() {
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
            scoreElRef.current &&
            comboElRef.current &&
            targetLetterElRef.current &&
            containerRef.current
        ) {
            const container = containerRef.current;
            const canvas = canvasRef.current;

            const resizeCanvas = () => {
                if (!container || !canvas) return;
                const containerWidth = container.clientWidth;
                const aspectRatio = 800 / 600;
                let width = Math.min(containerWidth - (isMobile ? 32 : 64), 800);
                let height = width / aspectRatio;

                canvas.width = 800;
                canvas.height = 600;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            gameRef.current = new Game({
                canvas: canvas,
                scoreEl: scoreElRef.current,
                comboEl: comboElRef.current,
                targetLetterEl: targetLetterElRef.current,
                restartButton: restartBtnRef.current,
            });

            gameRef.current.start();

            return () => {
                window.removeEventListener('resize', resizeCanvas);
                gameRef.current?.destroy();
            };
        }
    }, [isMobile]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 to-slate-950 p-4">
            <div
                ref={containerRef}
                className="game-wrapper relative w-full max-w-[800px]"
            >
                <canvas
                    ref={canvasRef}
                    id="gameCanvas"
                    width={800}
                    height={600}
                    className="block rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl touch-none"
                />

                <div className={`hud flex ${isMobile ? 'flex-col gap-4' : 'justify-between'} items-center mt-4 px-2 text-slate-300 font-semibold`}>
                    <div className="hud-left flex items-center gap-4 md:gap-6">
                        <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-5 py-3 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="icon text-xl md:text-xl">⭐</span>
                            <span ref={scoreElRef} id="scoreDisplay" className="value text-xl md:text-xl min-w-[2.5rem] md:min-w-[2.5rem] text-center text-white font-variant-numeric tabular-nums">0</span>
                            <span className="label text-xs md:text-xs uppercase tracking-widest text-slate-400">Points</span>
                        </div>
                        <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-5 py-3 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="icon text-xl md:text-xl">🎯</span>
                            <span ref={comboElRef} id="comboDisplay" className="value text-xl md:text-xl min-w-[2.5rem] md:min-w-[2.5rem] text-center text-white font-variant-numeric tabular-nums">0</span>
                            <span className="label text-xs md:text-xs uppercase tracking-widest text-slate-400">Combo</span>
                        </div>
                    </div>
                    <div className="hud-right flex items-center gap-4 md:gap-6">
                        <div className="hud-item flex items-center gap-2 bg-white/5 px-4 md:px-5 py-3 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
                            <span className="icon text-xl md:text-xl">📖</span>
                            <span ref={targetLetterElRef} id="letterDisplay" className="value text-2xl md:text-xl min-w-[3rem] md:min-w-[2.5rem] text-center text-white font-variant-numeric tabular-nums">أ</span>
                            <span className="label text-xs md:text-xs uppercase tracking-widest text-slate-400">Target</span>
                        </div>
                        <button
                            ref={restartBtnRef}
                            id="restartBtn"
                            className="bg-white/5 border border-white/10 text-slate-300 px-6 md:px-5 py-3 md:py-2 rounded-full font-semibold cursor-pointer transition-all hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105 backdrop-blur-sm flex items-center gap-2 text-base md:text-base"
                        >
                            ⟳ Restart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
