'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const arabicLetters = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];
const cardColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A', '#7DCEA0'];

interface CardData {
  id: number;
  letter: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const TOTAL_PAIRS = 6;

export function ArabicLetterMatch() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const shuffle = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startGame = useCallback(() => {
    const selected = shuffle(arabicLetters).slice(0, TOTAL_PAIRS);
    const pairs = shuffle([...selected, ...selected]);
    const colors = shuffle(cardColors);

    const newCards: CardData[] = pairs.map((letter, i) => ({
      id: i,
      letter,
      color: colors[i % colors.length],
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setAttempts(0);
    setLocked(false);
    setShowSuccess(false);
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleCardClick = (id: number) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setAttempts(prev => prev + 1);

      const [id1, id2] = newFlipped;
      const card1 = cards.find(c => c.id === id1)!;
      const card2 = newCards.find(c => c.id === id2)!;

      if (card1.letter === card2.letter) {
        // Match
        setScore(prev => prev + 10);
        setMatchedPairs(prev => prev + 1);
        
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === id1 || c.id === id2) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setLocked(false);
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === id1 || c.id === id2) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setLocked(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs === TOTAL_PAIRS && TOTAL_PAIRS > 0) {
      setShowSuccess(true);
      createConfetti();
    }
  }, [matchedPairs]);

  const createConfetti = () => {
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFEAA7', '#DDA0DD', '#45B7D1'][Math.floor(Math.random() * 5)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2500);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-auto py-8" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;600;800&display=swap" rel="stylesheet" />
      <div className="max-w-2xl mx-auto px-4 flex flex-col h-full font-['Baloo_Bhaijaan_2']">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4">
            🌟 Arabic Letter Match 🌟
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-full px-6 py-2 text-white font-bold shadow-lg border-2 border-white/50 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>Score: <span className="text-xl">{score}</span></span>
            </div>
            <div className="bg-white/25 backdrop-blur-sm rounded-full px-6 py-2 text-white font-bold shadow-lg border-2 border-white/50 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-300" />
              <span>Attempts: <span className="text-xl">{attempts}</span></span>
            </div>
          </div>
        </header>

        {/* Success Message */}
        {showSuccess && (
          <div className="text-center mb-4 animate-bounce">
            <div className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-200 text-purple-900 font-extrabold text-xl px-8 py-3 rounded-3xl shadow-2xl border-4 border-yellow-400">
              🎉 Great Job! 🎉
            </div>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square relative cursor-pointer transition-transform duration-200 hover:scale-105 ${card.isMatched ? 'animate-[bounce_0.6s_ease,glow_0.6s_ease]' : ''}`}
              style={{ perspective: '1000px' }}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d', transform: (card.isFlipped || card.isMatched) ? 'rotateY(180deg)' : '' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 backface-hidden flex items-center justify-center rounded-2xl bg-white/90 shadow-lg border-4 border-white/50"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-5xl animate-bounce">🎨</span>
                </div>
                {/* Back */}
                <div 
                  className="absolute inset-0 backface-hidden flex items-center justify-center rounded-2xl shadow-lg border-4 border-white/30"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`
                  }}
                >
                  <span className="text-6xl font-bold text-white drop-shadow-lg">
                    {card.letter}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <div className="text-center pb-8">
          <Button 
            onClick={startGame}
            className="bg-gradient-to-b from-yellow-300 to-yellow-400 hover:from-yellow-200 hover:to-yellow-300 text-purple-900 font-extrabold text-lg px-8 py-6 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 border-4 border-yellow-200"
          >
            <RefreshCw className="w-6 h-6 mr-2" />
            New Game
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;600;800&display=swap');
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes glow { 
          0% { filter: drop-shadow(0 0 0px rgba(255,215,0,0)); } 
          50% { filter: drop-shadow(0 0 15px rgba(255,215,0,1)); } 
          100% { filter: drop-shadow(0 0 0px rgba(255,215,0,0)); } 
        }

        .confetti { 
          position: fixed; 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          animation: fall 2s ease-out forwards; 
          pointer-events: none; 
          z-index: 100; 
        } 

        @keyframes fall { 
          0% { opacity: 1; transform: translateY(0) rotate(0deg); } 
          100% { opacity: 0; transform: translateY(500px) rotate(720deg); } 
        } 
      `}</style>
    </div>
  );
}
