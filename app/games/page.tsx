'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TajweedColorGame } from '@/components/games/tajweed-color-game';
import { HarakatHeroGame } from '@/components/games/harakat-hero-game';
import { ArabicVowelMarksGame } from './arabicvowelmarks';
import { 
  Gamepad2, 
  Clock, 
  Palette,
  Type,
  Headphones,
  Brain,
  Play,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const games = [
  {
    id: 'tajweed-color',
    title: 'Tajwīd Color Match',
    description: 'Match Tajwīd rules with their correct colors and learn pronunciation guidelines',
    icon: Palette,
    difficulty: 'Beginner',
    estimatedTime: '5-10 min',
    thumbnail: null
  },
  {
    id: 'harakat-hero',
    title: 'Harakāt Hero',
    description: 'Complete Arabic words by selecting the correct vowel marks',
    icon: Type,
    difficulty: 'Beginner',
    estimatedTime: '3-7 min',
    thumbnail: null
  },
  {
    id: 'arabic-vowel-marks',
    title: 'Arabic Vowel Marks Master',
    description: 'Master Arabic vowel marks by completing words with correct Harakāt and Tanween',
    icon: Type,
    difficulty: 'Intermediate',
    estimatedTime: '8-12 min',
    thumbnail: null
  },
  {
    id: 'ayah-puzzle',
    title: 'Ayah Order Puzzle',
    description: 'Arrange word tiles to form complete verses from the Qur\'an',
    icon: Brain,
    difficulty: 'Intermediate',
    estimatedTime: '8-12 min',
    thumbnail: null
  },
  {
    id: 'root-hunt',
    title: 'Word Root Hunt',
    description: 'Find all words sharing the same Arabic root within verses',
    icon: Brain,
    difficulty: 'Advanced',
    estimatedTime: '10-15 min',
    thumbnail: null
  },
  {
    id: 'listen-point',
    title: 'Listen & Point',
    description: 'Hear a word and click the correct word in the verse',
    icon: Headphones,
    difficulty: 'Intermediate',
    estimatedTime: '5-8 min',
    thumbnail: null
  }
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-primary';
      case 'Intermediate': return 'bg-secondary';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'tajweed-color':
        return <TajweedColorGame onComplete={() => setSelectedGame(null)} />;
      case 'harakat-hero':
        return <HarakatHeroGame onComplete={() => setSelectedGame(null)} />;
      case 'arabic-vowel-marks':
        return <ArabicVowelMarksGame onComplete={() => setSelectedGame(null)} />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      <div className="container py-6">
        {renderSelectedGame()}
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Interactive Learning Games</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Master Qur'an reading through fun, educational games designed for all ages
        </p>
      </div>


      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <Card key={game.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {game.thumbnail ? (
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted/40 flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                          <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-white text-xs ${getDifficultyColor(game.difficulty)}`}
                        >
                          {game.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {game.description}
                </CardDescription>
                
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{game.estimatedTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Thumbnail
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setSelectedGame(game.id)}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Game
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Path */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
          <CardDescription>
            Follow this path for optimal learning progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {games.slice(0, 3).map((game, index) => (
              <div key={game.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{game.title}</p>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </div>
                <Badge variant="outline">{game.difficulty}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Structured Learning?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            While games are fun, structured courses with certified teachers provide 
            comprehensive Qur'an education. Start your free 3-day trial today!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/enroll?type=trial">
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/teachers">
                Meet Our Teachers
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
