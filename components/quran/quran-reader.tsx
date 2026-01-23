'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Word {
  id: string;
  arabic: string;
  clean: string;
  translation: string;
  lemma: string;
  root: string;
  meaning: string;
  tajweed: string[];
}

interface Verse {
  id: number;
  number: number;
  surahNumber: number;
  arabic: string;
  translation: string;
  words: Word[];
}

interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  verses: Verse[];
}

interface QuranReaderProps {
  surah: Surah;
  fontSize: number;
  showTajweed: boolean;
  onWordClick: (word: Word) => void;
  quranType: 'tajweed' | 'urdu' | 'english';
}

export function QuranReader({
  surah,
  fontSize,
  showTajweed,
  onWordClick,
  quranType
}: QuranReaderProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [verseWordMeanings, setVerseWordMeanings] = useState<Record<number, string[]>>({});
  const [loadingMeanings, setLoadingMeanings] = useState<Record<number, boolean>>({});

  const getTajweedClass = (tajweed: string[]) => {
    if (!showTajweed || tajweed.length === 0) return '';

    // Apply the first tajweed rule found
    const primaryRule = tajweed[0];
    switch (primaryRule) {
      case 'ghunnah':
        return 'tajweed-ghunnah';
      case 'idgham':
        return 'tajweed-idgham';
      case 'iqlab':
        return 'tajweed-iqlab';
      case 'qalqalah':
        return 'tajweed-qalqalah';
      case 'madd':
        return 'tajweed-madd';
      case 'ikhfa':
        return 'tajweed-ikhfa';
      default:
        return '';
    }
  };

  const fetchVerseWords = async (surahId: number, verseNumber: number, verseId: number) => {
    if (verseWordMeanings[verseId]) return;
    try {
      setLoadingMeanings((prev) => ({ ...prev, [verseId]: true }));
      const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${surahId}:${verseNumber}?words=true&word_translation_language=en`);
      if (!res.ok) return;
      const data = await res.json();
      const meanings = (data?.verse?.words || []).map((w: any) => w?.translation?.text || '');
      setVerseWordMeanings((prev) => ({ ...prev, [verseId]: meanings }));
    } catch { } finally {
      setLoadingMeanings((prev) => ({ ...prev, [verseId]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {surah.verses.map((verse) => (
        <Card key={verse.id} className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-primary/30">
          <CardContent className="p-6 bg-gradient-to-r from-background to-muted/10">
            <div className="flex items-start gap-4">
              <Badge
                variant="secondary"
                className="mt-2 flex-shrink-0 font-mono bg-primary/10 text-primary border-primary/30"
              >
                {verse.number}
              </Badge>

              <div className="flex-1 space-y-4">
                <div
                  className="arabic-text leading-loose text-right p-4 bg-card rounded-lg shadow-sm border border-muted/30"
                  style={{ fontSize: `${fontSize}px` }}
                  dir="rtl"
                >
                  {verse.words.map((word, index) => (
                    <React.Fragment key={word.id}>
                      <span
                        className={cn(
                          "inline-block px-1 py-0.5 rounded-sm cursor-pointer transition-all duration-200 relative",
                          "hover:bg-primary/30 hover:shadow-sm hover:scale-105 focus:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50",
                          getTajweedClass(word.tajweed),
                          hoveredWord === word.id && "bg-primary/30 shadow-sm scale-105"
                        )}
                        onClick={() => onWordClick({
                          ...word,
                          meaning: (verseWordMeanings[verse.id] && verseWordMeanings[verse.id][index]) || ''
                        })}
                        onMouseEnter={() => {
                          setHoveredWord(word.id);
                          if (quranType !== 'tajweed') {
                            fetchVerseWords(verse.surahNumber, verse.number, verse.id);
                          }
                        }}
                        onMouseLeave={() => setHoveredWord(null)}
                        onFocus={() => setHoveredWord(word.id)}
                        onBlur={() => setHoveredWord(null)}
                        tabIndex={0}
                        role="button"
                        aria-label={
                          quranType === 'tajweed'
                            ? `Word: ${word.arabic}`
                            : `Word: ${word.arabic}, meaning: ${loadingMeanings[verse.id] ? 'Loading...' : ((verseWordMeanings[verse.id] && verseWordMeanings[verse.id][index]) || 'Meaning not available')}`
                        }
                      >
                        {word.arabic}

                        {/* Improved Tooltip */}
                        {hoveredWord === word.id && quranType !== 'tajweed' && (
                          <div className="absolute z-20 bottom-full mb-2 p-3 bg-popover border border-primary/30 rounded-md shadow-lg text-sm w-64 max-w-[70vw] left-1/2 -translate-x-1/2 overflow-hidden">
                            <div className="space-y-2 text-left whitespace-normal break-words" dir="ltr">
                              <div className="font-semibold arabic-text text-lg !text-center" dir="rtl">
                                {word.arabic}
                              </div>

                              <div className="text-primary font-medium text-center">
                                {loadingMeanings[verse.id] ? (
                                  <span className="inline-flex items-center">
                                    <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                                    Loading...
                                  </span>
                                ) : (
                                  (verseWordMeanings[verse.id] && verseWordMeanings[verse.id][index]) || 'Meaning not available'
                                )}
                              </div>
                              {word.tajweed.length > 0 && (
                                <div className="text-xs border-t pt-2">
                                  <span className="text-accent font-medium">Tajwīd:</span>{' '}
                                  <span className="capitalize">{word.tajweed.join(', ')}</span>
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-b border-r border-primary/30 rotate-45"></div>
                          </div>
                        )}
                      </span>
                      {index < verse.words.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                </div>

                {quranType !== 'tajweed' && verse.translation && (
                  <div className="text-muted-foreground text-sm leading-relaxed border-t border-muted/30 pt-3 bg-muted/10 p-3 rounded" dir="ltr">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      Translation:
                    </span>
                    <p className="mt-1">{verse.translation}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
