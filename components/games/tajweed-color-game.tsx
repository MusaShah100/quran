'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const tajweedRules = [
  { 
    rule: 'Ghunnah', 
    color: 'tajweed-ghunna', 
    description: 'Nasal sound with م or ن',
    example: 'مِن'
  },
  { 
    rule: 'Idghaam', 
    color: 'tajweed-idgham', 
    description: 'Merging of sounds',
    example: 'مِن رَّبِّهِمْ'
  },
  { 
    rule: 'Iqlaab', 
    color: 'tajweed-iqlab', 
    description: 'Changing ن to م before ب',
    example: 'أَنبِيَاء'
  },
  { 
    rule: 'Qalqalah', 
    color: 'tajweed-qalqala', 
    description: 'Echo sound with ق د ج ب ط',
    example: 'الْحَقِّ'
  }
];

interface TajweedColorGameProps {
  onComplete: () => void;
}

export function TajweedColorGame({ onComplete }: TajweedColorGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const questions = [
    {
      word: 'مِن',
      correctRule: 'Ghunnah',
      options: ['Ghunnah', 'Idghaam', 'Iqlaab', 'Qalqalah']
    },
    {
      word: 'مِن رَّبِّهِمْ',
      correctRule: 'Idghaam',
      options: ['Ghunnah', 'Idghaam', 'Iqlaab', 'Qalqalah']
    },
    {
      word: 'أَنبِيَاء',
      correctRule: 'Iqlaab',
      options: ['Ghunnah', 'Idghaam', 'Iqlaab', 'Qalqalah']
    },
    {
      word: 'الْحَقِّ',
      correctRule: 'Qalqalah',
      options: ['Ghunnah', 'Idghaam', 'Iqlaab', 'Qalqalah']
    }
  ];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      setAnswered(true);
    }
  }, [timeLeft, answered, gameStarted]);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === questions[currentQuestion].correctRule) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(30);
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
    setTimeLeft(30);
    setGameStarted(false);
  };

  const getRuleColor = (ruleName: string) => {
    const rule = tajweedRules.find(r => r.rule === ruleName);
    return rule ? rule.color : 'bg-muted';
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
              <CardTitle>Tajwīd Color Match</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-4">
                Learn to identify Tajwīd rules by their traditional colors!
              </p>
              <p className="text-muted-foreground">
                You'll see Arabic words with Tajwīd rules applied. Match each word 
                with its correct rule and color.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Tajwīd Rules Reference:</h3>
              {tajweedRules.map((rule) => (
                <div key={rule.rule} className="flex items-center gap-3 p-3 border rounded">
                  <div className={cn("w-6 h-6 rounded", rule.color)} />
                  <div>
                    <p className="font-medium">{rule.rule}</p>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <div className="ml-auto arabic-text text-xl">{rule.example}</div>
                </div>
              ))}
            </div>
            
            <Button onClick={() => setGameStarted(true)} className="w-full" size="lg">
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onComplete}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Score: <span className="font-bold">{score}/{questions.length}</span>
              </div>
              <div className="text-sm">
                Time: <span className="font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              Which Tajwīd rule applies to this word?
            </h3>
            <div className="arabic-text text-4xl p-6 bg-muted/20 rounded-lg mb-4">
              {currentQ.word}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((option) => {
              const rule = tajweedRules.find(r => r.rule === option);
              const isCorrect = option === currentQ.correctRule;
              const isSelected = selectedAnswer === option;
              const showResult = answered;
              
              return (
                <Button
                  key={option}
                  variant="outline"
                  className={cn(
                    "h-auto p-4 text-left flex items-center gap-3",
                    isSelected && showResult && isCorrect && "border-green-500 bg-green-50",
                    isSelected && showResult && !isCorrect && "border-red-500 bg-red-50",
                    !isSelected && showResult && isCorrect && "border-green-500 bg-green-50"
                  )}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >
                  <div className={cn("w-6 h-6 rounded", rule?.color)} />
                  <div className="flex-1">
                    <p className="font-medium">{option}</p>
                    <p className="text-sm text-muted-foreground">{rule?.description}</p>
                  </div>
                  {showResult && isSelected && (
                    isCorrect ? 
                      <Check className="h-5 w-5 text-green-600" /> : 
                      <X className="h-5 w-5 text-red-600" />
                  )}
                  {showResult && !isSelected && isCorrect && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </Button>
              );
            })}
          </div>
          
          {answered && (
            <div className="text-center space-y-4">
              {selectedAnswer === currentQ.correctRule ? (
                <Badge className="bg-green-500">Correct! +1 point</Badge>
              ) : (
                <Badge variant="destructive">
                  Incorrect. The answer was {currentQ.correctRule}
                </Badge>
              )}
              
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={nextQuestion} className="w-full">
                  Next Question
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    Game Complete! Final Score: {score}/{questions.length}
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