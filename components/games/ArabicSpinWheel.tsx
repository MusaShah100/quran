'use client';

import React, { useEffect, useRef, useState } from 'react';

export function ArabicSpinWheel() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [result, setResult] = useState<string>('');
    const [spinning, setSpinning] = useState(false);

    const letters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'];
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#e91e63', '#00bcd4', '#8bc34a', '#ff9800', '#795548', '#607d8b', '#4caf50', '#ff5722', '#673ab7', '#009688', '#cddc39', '#ffc107', '#03a9f4', '#e74c3c', '#8e44ad', '#16a085', '#d35400', '#27ae60', '#2980b9', '#c0392b', '#7f8c8d', '#f39c12'];
    const angleRef = useRef(0);
    const animFrameRef = useRef<number | null>(null);

    const drawWheel = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const size = 340;
        const center = size / 2;
        const radius = center - 10;
        const arc = (2 * Math.PI) / letters.length;

        ctx.clearRect(0, 0, size, size);

        letters.forEach((l, i) => {
            const start = angleRef.current + i * arc;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, start, start + arc);
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw letter
            ctx.save();
            ctx.translate(center, center);
            const mid = start + arc / 2;
            const tx = Math.cos(mid) * radius * 0.85;
            const ty = Math.sin(mid) * radius * 0.85;
            ctx.translate(tx, ty);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 15px var(--font-amiri), Amiri';
            ctx.fillText(l, 0, 0);
            ctx.restore();
        });

        ctx.beginPath();
        ctx.arc(center, center, 22, 0, 2 * Math.PI);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawWheel(ctx, canvas);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    function spin() {
        if (spinning) return;
        setSpinning(true);
        setResult('');

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const size = 340;
        const center = size / 2;
        const radius = center - 10;

        const totalRotation = Math.PI * 2 * (5 + Math.random() * 5);
        const duration = 4000;
        const startAngle = angleRef.current;
        const startTime = performance.now();

        function animate(now: number) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            angleRef.current = startAngle + totalRotation * ease;
            drawWheel(ctx!, canvas!);

            if (t < 1) {
                animFrameRef.current = requestAnimationFrame(animate);
            } else {
                setSpinning(false);
                const arc = (2 * Math.PI) / letters.length;
                const adjusted = (Math.PI * 1.5 - (angleRef.current % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI);
                const idx = Math.floor(adjusted / arc) % letters.length;
                setResult(letters[idx]);
            }
        }
        requestAnimationFrame(animate);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative" style={{ background: 'linear-gradient(135deg, rgb(230, 217, 245) 0%, rgb(212, 179, 230) 50%, rgb(201, 163, 222) 100%)' }}>
            {/* Stars */}
            <div className="stars fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="star absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <header className="mb-6 text-center">
                    <h1 className="text-4xl font-bold text-white">Arabic Alphabet Spin Wheel</h1>
                    <p className="mt-2 text-lg font-bold text-white">Click the button to spin and learn a letter!</p>
                </header>

                <main className="flex flex-col items-center gap-6">
                    <div className="wheel-container relative inline-block">
                        <div className="pointer absolute -top-5 left-1/2 -translate-x-1/2 z-10" style={{
                            width: 0,
                            height: 0,
                            borderLeft: '14px solid transparent',
                            borderRight: '14px solid transparent',
                            borderTop: '30px solid #dc2626',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }} />
                        <canvas ref={canvasRef} id="wheel" width={340} height={340} />
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning}
                        className="px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
                        style={{
                            background: 'rgb(147, 112, 219)',
                            color: 'white'
                        }}
                    >
                        🎯 Spin Wheel
                    </button>

                    <div className="text-center mt-2">
                        <p className="text-sm mb-1 font-bold text-white">Selected Letter:</p>
                        <div
                            id="result"
                            className="text-7xl font-bold min-h-[90px] text-center"
                            style={{ fontFamily: 'var(--font-amiri), Amiri, serif', color: 'rgb(147, 112, 219)' }}
                        >
                            {result}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
