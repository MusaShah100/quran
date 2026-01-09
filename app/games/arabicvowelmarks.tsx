'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, RotateCcw, Zap, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const vowelMarkQuestions = [
  {
    arabicWord: 'كِتَابٌ',
    transliteration: 'kitābun',
    meaning: 'a book',
    vowelMarks: ['ِ', 'َ', 'ٌ'],
    correctOrder: [0, 1, 2],
    difficulty: 'easy'
  },
  {
    arabicWord: 'مُدَرِّسٌ',
    transliteration: 'mudarrisun',
    meaning: 'a teacher',
    vowelMarks: ['ُ', 'َ', 'ِّ', 'ٌ'],
    correctOrder: [0, 1, 2, 3],
    difficulty: 'medium'
  },
  {
    arabicWord: 'طَالِبَةٌ',
    transliteration: 'ṭālibatun',
    meaning: 'a female student',
    vowelMarks: ['َ', 'ِ', 'َ', 'ٌ'],
    correctOrder: [0, 1, 2, 3],
    difficulty: 'medium'
  },
  {
    arabicWord: 'مَكْتَبَةٌ',
    transliteration: 'maktabatun',
    meaning: 'a library',
    vowelMarks: ['َ', 'ْ', 'َ', 'َ', 'ٌ'],
    correctOrder: [0, 1, 2, 3, 4],
    difficulty: 'hard'
  },
  {
    arabicWord: 'جَامِعَةٌ',
    transliteration: "jāmi'atun",
    meaning: 'a university',
    vowelMarks: ['َ', 'ِ', 'َ', 'ٌ'],
    correctOrder: [0, 1, 2, 3],
    difficulty: 'medium'
  }
];

const vowelMarkNames = {
  'َ': 'Fatha',
  'ِ': 'Kasra',
  'ُ': 'Damma',
  'ْ': 'Sukun',
  'ٌ': 'Tanween Damma',
  'ً': 'Tanween Fatha',
  'ٍ': 'Tanween Kasra',
  'ّ': 'Shadda',
  'ِّ': 'Kasra + Shadda'
};

interface ArabicVowelMarksGameProps {
  onComplete: () => void;
}

export function ArabicVowelMarksGame({ onComplete }: ArabicVowelMarksGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      setAnswered(true);
      setStreak(0);
    }
  }, [timeLeft, answered, gameStarted]);

  const handleVowelMarkSelect = (vowelMark: string) => {
    if (answered || userAnswers.length >= vowelMarkQuestions[currentQuestion].vowelMarks.length) return;
    
    setUserAnswers([...userAnswers, vowelMark]);
  };

  const removeLastVowelMark = () => {
    if (answered || userAnswers.length === 0) return;
    setUserAnswers(userAnswers.slice(0, -1));
  };

  const submitAnswer = () => {
    if (answered || userAnswers.length !== vowelMarkQuestions[currentQuestion].vowelMarks.length) return;
    
    setAnswered(true);
    
    const currentQ = vowelMarkQuestions[currentQuestion];
    const isCorrect = userAnswers.every((mark, index) => mark === currentQ.vowelMarks[index]);
    
    if (isCorrect) {
      const basePoints = currentQ.difficulty === 'easy' ? 10 : currentQ.difficulty === 'medium' ? 15 : 20;
      const timeBonus = Math.max(0, Math.floor(timeLeft / 2));
      const streakBonus = streak * 3;
      const totalPoints = basePoints + timeBonus + streakBonus;
      
      setScore(score + totalPoints);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < vowelMarkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswers([]);
      setAnswered(false);
      setTimeLeft(30);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setAnswered(false);
    setTimeLeft(30);
    setGameStarted(false);
    setStreak(0);
    setShowHint(false);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onComplete}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Arabic Vowel Marks Master</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-4">
                Master Arabic vowel marks (Harakāt and Tanween) by completing words!
              </p>
              <p className="text-muted-foreground">
                Look at the Arabic word and add the correct vowel marks in the right order.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Vowel Marks Reference:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(vowelMarkNames).map(([symbol, name]) => (
                  <div key={symbol} className="flex items-center gap-3 p-3 border rounded">
                    <div className="arabic-text text-2xl">{symbol}</div>
                    <p className="font-medium text-sm">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">How to Play:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Look at the Arabic word and its meaning</li>
                <li>• Select vowel marks in the correct order</li>
                <li>• Use the transliteration as a guide</li>
                <li>• Submit when you've added all marks</li>
              </ul>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Scoring:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Easy: 10 points, Medium: 15 points, Hard: 20 points</li>
                <li>• Time bonus: remaining seconds ÷ 2</li>
                <li>• Streak bonus: 3 points per consecutive correct answer</li>
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

  const currentQ = vowelMarkQuestions[currentQuestion];
  const progress = ((currentQuestion + (answered ? 1 : 0)) / vowelMarkQuestions.length) * 100;
  
  // Remove vowel marks from the word to show base letters
  const baseWord = currentQ.arabicWord.replace(/[ًٌٍَُِّْ]/g, '');
  
  const isCorrect = answered && userAnswers.every((mark, index) => mark === currentQ.vowelMarks[index]);
  const canSubmit = userAnswers.length === currentQ.vowelMarks.length && !answered;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onComplete}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Question {currentQuestion + 1} of {vowelMarkQuestions.length}</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Score: <span className="font-bold">{score}</span>
              </div>
              <div className="text-sm">
                Streak: <span className="font-bold text-orange-500">{streak}</span>
              </div>
              <div className="text-sm">
                Time: <span className={cn("font-bold", timeLeft <= 10 ? "text-red-500" : "")}>{timeLeft}s</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">
                Add vowel marks to complete the word:
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHint(!showHint)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Badge variant="outline" className={cn(
              "mb-4",
              currentQ.difficulty === 'easy' && "border-green-500",
              currentQ.difficulty === 'medium' && "border-yellow-500",
              currentQ.difficulty === 'hard' && "border-red-500"
            )}>
              {currentQ.difficulty.toUpperCase()}
            </Badge>
            
            <div className="space-y-2">
              <div className="arabic-text text-5xl p-6 bg-muted/20 rounded-lg">
                {baseWord}
              </div>
              <p className="text-muted-foreground">Meaning: "{currentQ.meaning}"</p>
              {showHint && (
                <p className="text-sm text-blue-600">Pronunciation: {currentQ.transliteration}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Your vowel marks:</h4>
              <div className="flex justify-center gap-2 min-h-[3rem] items-center">
                {userAnswers.map((mark, index) => (
                  <div key={index} className="w-12 h-12 border-2 border-primary rounded-lg flex items-center justify-center arabic-text text-2xl bg-primary/10">
                    {mark}
                  </div>
                ))}
                {Array.from({ length: currentQ.vowelMarks.length - userAnswers.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-12 h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center">
                    ?
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {Object.keys(vowelMarkNames).map((mark) => (
                <Button
                  key={mark}
                  variant="outline"
                  className="h-16 text-xl"
                  onClick={() => handleVowelMarkSelect(mark)}
                  disabled={answered || userAnswers.length >= currentQ.vowelMarks.length}
                >
                  <div className="text-center">
                    <div className="arabic-text text-2xl mb-1">{mark}</div>
                    <div className="text-xs">{vowelMarkNames[mark as keyof typeof vowelMarkNames]}</div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={removeLastVowelMark}
                disabled={answered || userAnswers.length === 0}
                className="flex-1"
              >
                Remove Last
              </Button>
              <Button 
                onClick={submitAnswer}
                disabled={!canSubmit}
                className="flex-1"
              >
                Submit Answer
              </Button>
            </div>
          </div>
          
          {answered && (
            <div className="text-center space-y-4">
              {isCorrect ? (
                <div className="space-y-2">
                  <Badge className="bg-green-500">Correct!</Badge>
                  <div className="arabic-text text-3xl p-4 bg-green-50 rounded-lg">
                    {currentQ.arabicWord}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect pronunciation: {currentQ.transliteration}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge variant="destructive">Incorrect</Badge>
                  <div className="space-y-2">
                    <p className="text-sm">Correct answer:</p>
                    <div className="arabic-text text-3xl p-4 bg-red-50 rounded-lg">
                      {currentQ.arabicWord}
                    </div>
                  </div>
                </div>
              )}
              
              {currentQuestion < vowelMarkQuestions.length - 1 ? (
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