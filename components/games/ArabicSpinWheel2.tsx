'use client';

import React, { useEffect, useRef, useState } from 'react';

export function ArabicSpinWheel2() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [result, setResult] = useState<string>('');
    const [spinning, setSpinning] = useState(false);
    const angleRef = useRef(0);
    const animFrameRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const canvasStateRef = useRef<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null>(null);

    const letters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'];
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#e91e63', '#00bcd4', '#8bc34a', '#ff9800', '#795548', '#607d8b', '#4caf50', '#ff5722', '#673ab7', '#009688', '#cddc39', '#ffc107', '#03a9f4', '#e74c3c', '#8e44ad', '#16a085', '#d35400', '#27ae60', '#2980b9', '#c0392b', '#7f8c8d', '#f39c12'];

    const getAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    };

    const playTickSound = () => {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') ctx.resume();

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = 800;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {
            // Silently fail if audio not supported
        }
    };

    const drawWheel = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const size = canvas.width;
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

            // Draw letter horizontally (no rotation applied to text)
            ctx.save();
            ctx.translate(center, center);
            const mid = start + arc / 2;
            const tx = Math.cos(mid) * radius * 0.90;
            const ty = Math.sin(mid) * radius * 0.90;
            ctx.translate(tx, ty);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.floor(radius * 0.45)}px var(--font-amiri), Amiri`;
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
        canvasStateRef.current = { canvas, ctx };

        // Responsive canvas sizing
        const resizeCanvas = () => {
            let maxSize = 320;
            if (window.innerWidth >= 768) {
                maxSize = 380;
            } else if (window.innerWidth >= 640) {
                maxSize = 350;
            }
            canvas.width = maxSize;
            canvas.height = maxSize;
            drawWheel(ctx, canvas);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    function spin() {
        if (spinning) return;
        const state = canvasStateRef.current;
        if (!state) return;

        setSpinning(true);
        setResult('');

        const { canvas, ctx } = state;
        const totalRotation = Math.PI * 2 * (5 + Math.random() * 5);
        const duration = 4000;
        const startAngle = angleRef.current;
        const startTime = performance.now();
        let lastTickAngle = 0;

        function animate(now: number) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            angleRef.current = startAngle + totalRotation * ease;

            // Play tick sound at intervals during spin
            const currentTickInterval = Math.floor(angleRef.current / (Math.PI / 8));
            if (currentTickInterval !== lastTickAngle && t > 0.1 && t < 0.95) {
                playTickSound();
                lastTickAngle = currentTickInterval;
            }

            drawWheel(ctx, canvas);

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
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 relative z-10" style={{ background: 'linear-gradient(135deg, rgb(230, 217, 245), rgb(212, 179, 230), rgb(201, 163, 222))' }}>
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>

            {/* Stars */}
            <div className="stars fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="star absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle 3s infinite`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <header className="mb-2 text-center px-2">
                    <h1 className="text-lg sm:text-xl font-bold text-black">Arabic Alphabet Spin Wheel</h1>
                    <p className="mt-1 text-xs sm:text-sm text-black font-bold">Click the button to spin and learn a letter!</p>
                </header>

                <main className="flex flex-col items-center gap-3 w-full px-2">
                    <div className="wheel-container relative inline-block">
                        <div className="pointer absolute top-[-12px] left-1/2 -translate-x-1/2 z-10" style={{
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '22px solid #dc2626',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }} />
                        <canvas ref={canvasRef} id="wheel" />
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning}
                        className="px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40 disabled:opacity-50"
                        style={{ background: 'rgb(147, 112, 219)', color: 'white' }}
                    >
                        🎯 Spin Wheel
                    </button>

                    <div className="text-center mt-2 px-2">
                        <p className="text-sm mb-3 font-semibold text-black">Your Letter:</p>
                        <div
                            className="px-4 py-4 rounded-xl shadow-xl inline-block"
                            style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.15)' }}
                        >
                            <div
                                id="result"
                                className="text-4xl sm:text-5xl font-bold"
                                style={{ fontFamily: 'var(--font-amiri), Amiri, serif', lineHeight: 1, color: 'rgb(147, 112, 219)' }}
                            >
                                {result}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
