'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, RotateCcw, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const harakatQuestions = [
  {
    word: 'بِسْمِ',
    missingHarakat: 'ِ', // kasra
    options: ['َ', 'ِ', 'ُ', 'ْ'],
    meaning: 'In the name'
  },
  {
    word: 'اللَّهِ',
    missingHarakat: 'َ', // fatha
    options: ['َ', 'ِ', 'ُ', 'ْ'],
    meaning: 'Allah'
  },
  {
    word: 'الرَّحْمَٰنِ',
    missingHarakat: 'َ', // fatha
    options: ['َ', 'ِ', 'ُ', 'ْ'],
    meaning: 'The Most Gracious'
  },
  {
    word: 'الرَّحِيمِ',
    missingHarakat: 'ِ', // kasra
    options: ['َ', 'ِ', 'ُ', 'ْ'],
    meaning: 'The Most Merciful'
  }
];

const harakatNames = {
  'َ': 'Fatha',
  'ِ': 'Kasra', 
  'ُ': 'Damma',
  'ْ': 'Sukun'
};

interface HarakatHeroGameProps {
  onComplete: () => void;
}

export function HarakatHeroGame({ onComplete }: HarakatHeroGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      setAnswered(true);
      setStreak(0);
    }
  }, [timeLeft, answered, gameStarted]);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === harakatQuestions[currentQuestion].missingHarakat) {
      const basePoints = 10;
      const timeBonus = Math.max(0, timeLeft - 5);
      const streakBonus = streak * 2;
      const totalPoints = basePoints + timeBonus + streakBonus;
      
      setScore(score + totalPoints);
      setStreak(streak + 1);
      setTimeBonus(timeBonus + streakBonus);
    } else {
      setStreak(0);
      setTimeBonus(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < harakatQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(20);
      setTimeBonus(0);
    } else {
      // Game complete
      onComplete();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setTimeLeft(20);
    setGameStarted(false);
    setStreak(0);
    setTimeBonus(0);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onComplete}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Harakāt Hero</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-4">
                Master Arabic vowel marks (Harakāt) in this time-attack game!
              </p>
              <p className="text-muted-foreground">
                Complete Arabic words by selecting the correct vowel mark. 
                Speed and accuracy earn bonus points!
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Harakāt Reference:</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(harakatNames).map(([symbol, name]) => (
                  <div key={symbol} className="flex items-center gap-3 p-3 border rounded">
                    <div className="arabic-text text-2xl">{symbol}</div>
                    <p className="font-medium">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Scoring:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Base points: 10 per correct answer</li>
                <li>• Time bonus: remaining seconds (max 15)</li>
                <li>• Streak bonus: 2 points per consecutive correct answer</li>
              </ul>
            </div>
            
            <Button onClick={() => setGameStarted(true)} className="w-full" size="lg">
              <Zap className="mr-2 h-4 w-4" />
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = harakatQuestions[currentQuestion];
  const progress = ((currentQuestion + (answered ? 1 : 0)) / harakatQuestions.length) * 100;
  
  // Create word with missing harakat
  const displayWord = currentQ.word.replace(currentQ.missingHarakat, '_');

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onComplete}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Question {currentQuestion + 1} of {harakatQuestions.length}</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Score: <span className="font-bold">{score}</span>
              </div>
              <div className="text-sm">
                Streak: <span className="font-bold text-orange-500">{streak}</span>
              </div>
              <div className="text-sm">
                Time: <span className={cn("font-bold", timeLeft <= 5 ? "text-red-500" : "")}>{timeLeft}s</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Complete the word by adding the correct Harakāt:
            </h3>
            <p className="text-muted-foreground mb-4">"{currentQ.meaning}"</p>
            
            <div className="arabic-text text-5xl p-6 bg-muted/20 rounded-lg mb-4">
              {displayWord}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((option) => {
              const isCorrect = option === currentQ.missingHarakat;
              const isSelected = selectedAnswer === option;
              const showResult = answered;
              
              return (
                <Button
                  key={option}
                  variant="outline"
                  className={cn(
                    "h-20 text-2xl",
                    isSelected && showResult && isCorrect && "border-green-500 bg-green-50",
                    isSelected && showResult && !isCorrect && "border-red-500 bg-red-50",
                    !isSelected && showResult && isCorrect && "border-green-500 bg-green-50"
                  )}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >
                  <div className="text-center">
                    <div className="arabic-text text-3xl mb-1">{option}</div>
                    <div className="text-xs">{harakatNames[option as keyof typeof harakatNames]}</div>
                  </div>
                  {showResult && isSelected && (
                    <div className="absolute top-1 right-1">
                      {isCorrect ? 
                        <Check className="h-4 w-4 text-green-600" /> : 
                        <X className="h-4 w-4 text-red-600" />
                      }
                    </div>
                  )}
                  {showResult && !isSelected && isCorrect && (
                    <div className="absolute top-1 right-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
          
          {answered && (
            <div className="text-center space-y-4">
              {selectedAnswer === currentQ.missingHarakat ? (
                <div className="space-y-2">
                  <Badge className="bg-green-500">Correct!</Badge>
                  {timeBonus > 0 && (
                    <p className="text-sm text-muted-foreground">
                      +10 base points + {timeBonus} bonus points = {10 + timeBonus} total
                    </p>
                  )}
                </div>
              ) : (
                <Badge variant="destructive">
                  Incorrect. The answer was {harakatNames[currentQ.missingHarakat as keyof typeof harakatNames]}
                </Badge>
              )}
              
              {currentQuestion < harakatQuestions.length - 1 ? (
                <Button onClick={nextQuestion} className="w-full">
                  Next Question
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    Game Complete! Final Score: {score} points
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={resetGame} variant="outline" className="flex-1">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Play Again
                    </Button>
                    <Button onClick={onComplete} className="flex-1">
                      Back to Games
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}