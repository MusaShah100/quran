'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';

const letters = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
const vowels = ['َ', 'ِ', 'ُ'];

export function ArabicVowelsSpaceship() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [speed, setSpeed] = useState(5000);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [currentVowel, setCurrentVowel] = useState<string | null>(null);
  const [letterFlying, setLetterFlying] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [correctBtn, setCorrectBtn] = useState<string | null>(null);
  const [wrongBtn, setWrongBtn] = useState<string | null>(null);
  const [letterKey, setLetterKey] = useState(0);

  const letterContainerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playWrongSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const spawnLetter = () => {
    if (!activeRef.current) return;
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const vowel = vowels[Math.floor(Math.random() * vowels.length)];
    setCurrentLetter(letter);
    setCurrentVowel(vowel);
    setLetterFlying(false);
    setLetterKey(prev => prev + 1);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setSpeed(5000);
    activeRef.current = true;
    spawnLetter();
  };

  const miss = () => {
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) {
      endGame();
      return;
    }
    spawnLetter();
  };

  const endGame = () => {
    activeRef.current = false;
    setGameState('gameover');
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const handleVowelClick = (vowel: string) => {
    if (!activeRef.current || gameState !== 'playing' || !currentVowel || letterFlying) return;

    if (vowel === currentVowel) {
      const newScore = score + 1;
      setScore(newScore);
      setCorrectBtn(vowel);
      setTimeout(() => setCorrectBtn(null), 400);

      setLetterFlying(true);
      activeRef.current = false;

      setTimeout(() => {
        activeRef.current = true;
        if (newScore % 5 === 0) {
          setSpeed(prev => Math.max(2000, prev - 400));
        }
        spawnLetter();
      }, 600);
    } else {
      playWrongSound();
      setWrongBtn(vowel);
      setTimeout(() => setWrongBtn(null), 400);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        endGame();
        return;
      }
      spawnLetter();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen overflow-hidden" style={{ background: '#0f0524' }}>
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 z-10">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="text-2xl">
              {i < lives ? '❤️' : ''}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-xl font-bold text-purple-200">Score:</span>
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="text-white hover:text-purple-300 transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Game instructions"
          title="Game instructions"
        >
          <Info size={28} />
        </button>
      </header>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/85 backdrop-blur-md">
          <div className="bg-gray-900 border-2 border-purple-500 rounded-2xl p-8 max-w-sm mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">How to Play</h2>
              <button onClick={() => setShowHelp(false)} className="text-white hover:text-purple-300 p-1">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4" dir="ltr">
              <p className="text-purple-200 text-base">👁️ Watch the Arabic letter fall from the sky.</p>
              <p className="text-purple-200 text-base">🎯 Each letter has a vowel mark (diacritic) on it.</p>
              <p className="text-purple-200 text-base">🚀 Click the spaceship that matches the vowel mark.</p>
              <p className="text-purple-200 text-base">❤️ You have 3 lives. Miss or choose wrong and you lose one!</p>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <main className="flex-1 relative w-full">
        <div ref={letterContainerRef} className="relative w-full h-full">
          {gameState === 'playing' && currentLetter && currentVowel && (
            <div
              key={letterKey}
              className={`falling-letter absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl text-white font-serif ${letterFlying ? 'flying-to-rocket' : ''}`}
              style={{
                textShadow: '0 0 30px #a78bfa, 0 0 60px #7c3aed',
                fontFamily: "'Traditional Arabic', 'Arabic Typesetting', serif",
                animation: letterFlying
                  ? 'fly-to-rocket 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                  : `fall ${speed}ms linear forwards`,
                top: letterFlying ? undefined : '-100px'
              }}
              onAnimationEnd={(e) => {
                if (!letterFlying && e.animationName === 'fall') {
                  miss();
                }
              }}
            >
              {currentLetter + currentVowel}
            </div>
          )}
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="w-full pb-6 flex flex-col items-center gap-3 z-10">
        {gameState === 'playing' && (
          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleVowelClick('َ')}
                className={`ship-btn flex flex-col items-center gap-2 min-w-[100px] md:min-w-[120px] px-4 md:px-5 py-3 md:py-4 rounded-xl border-3 border-white/20 cursor-pointer transition-transform active:scale-90 ${correctBtn === 'َ' ? 'correct-flash' : ''} ${wrongBtn === 'َ' ? 'wrong-flash' : ''}`}
                style={{ background: 'rgb(88, 28, 135)' }}
              >
                <span className="text-5xl md:text-6xl text-purple-300 leading-none font-bold italic -skew-x-[12deg] inline-block">ـَ</span>
                <span className="text-3xl">🚀</span>
                <span className="vowel-sign text-sm md:text-base font-semibold text-white font-serif">فَتحة</span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleVowelClick('ُ')}
                className={`ship-btn flex flex-col items-center gap-2 min-w-[100px] md:min-w-[120px] px-4 md:px-5 py-3 md:py-4 rounded-xl border-3 border-white/20 cursor-pointer transition-transform active:scale-90 ${correctBtn === 'ُ' ? 'correct-flash' : ''} ${wrongBtn === 'ُ' ? 'wrong-flash' : ''}`}
                style={{ background: 'rgb(30, 58, 95)' }}
              >
                <span className="text-5xl md:text-6xl text-blue-300 leading-none font-bold italic -skew-x-[12deg] inline-block">ـُ</span>
                <span className="text-3xl">🚀</span>
                <span className="vowel-sign text-sm md:text-base font-semibold text-white font-serif">ضُمّة</span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleVowelClick('ِ')}
                className={`ship-btn flex flex-col items-center gap-2 min-w-[100px] md:min-w-[120px] px-4 md:px-5 py-3 md:py-4 rounded-xl border-3 border-white/20 cursor-pointer transition-transform active:scale-90 ${correctBtn === 'ِ' ? 'correct-flash' : ''} ${wrongBtn === 'ِ' ? 'wrong-flash' : ''}`}
                style={{ background: 'rgb(6, 78, 59)' }}
              >
                <span className="text-5xl md:text-6xl text-emerald-300 leading-none font-bold italic -skew-x-[12deg] inline-block">ـِ</span>
                <span className="text-3xl">🚀</span>
                <span className="vowel-sign text-sm md:text-base font-semibold text-white font-serif">كِسرة</span>
              </button>
            </div>
          </div>
        )}
      </footer>

      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/85 backdrop-blur-md gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">🚀 Arabic Vowels Spaceship</h1>
          <p className="text-lg md:text-xl text-purple-200 text-center max-w-md px-4">Match the falling letter to the correct spaceship!</p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl text-lg md:text-xl font-bold"
            style={{ background: 'rgb(124, 58, 237)', color: 'white' }}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/85 backdrop-blur-md gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Game Over! 🌟</h2>
          <p className="text-xl md:text-2xl text-purple-200">Final Score: {score}</p>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl text-lg md:text-xl font-bold"
            style={{ background: 'rgb(124, 58, 237)', color: 'white' }}
          >
            Play Again
          </button>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fall {
          from {
            top: -100px;
          }
          to {
            top: 70vh;
          }
        }
        @keyframes fly-to-rocket {
          to {
            opacity: 0;
            transform: translateX(-50%) scale(0.3);
          }
        }
        @keyframes flash-green {
          0%, 100% {
            background: inherit;
          }
          50% {
            background: #22c55e;
          }
        }
        @keyframes flash-red {
          0%, 100% {
            background: inherit;
          }
          50% {
            background: #ef4444;
          }
        }
        .correct-flash {
          animation: flash-green 0.4s;
        }
        .wrong-flash {
          animation: flash-red 0.4s;
        }
      `}</style>
    </div>
  );
}
