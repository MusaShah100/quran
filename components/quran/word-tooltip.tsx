'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Volume2, BookmarkPlus, Copy } from 'lucide-react';
import { toast } from 'sonner';

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

interface WordTooltipProps {
  word: Word;
}

export function WordTooltip({ word }: WordTooltipProps) {
  const handleCopyWord = () => {
    navigator.clipboard.writeText(word.arabic);
    toast.success('Word copied to clipboard');
  };

  const handlePlayWord = () => {
    // Remove play functionality as requested
    toast.info('Audio feature not available');
  };

  const handleBookmark = () => {
    // This would save to user's bookmarks
    toast.success('Word bookmarked');
  };

  const getTajweedDescription = (rule: string): string => {
    const descriptions: { [key: string]: string } = {
      'ghunnah': 'Nasal sound produced when pronouncing م or ن',
      'idgham': 'Merging of sounds between two letters',
      'iqlab': 'Changing ن to م sound before ب',
      'qalqalah': 'Echo or bounce sound with ق د ج ب ط',
      'madd': 'Elongation of vowel sounds',
      'ikhfa': 'Hiding the sound of ن before certain letters'
    };
    return descriptions[rule] || rule;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/10 p-3">
        <div className="flex items-center justify-end mb-2">
          <Badge variant="outline" className="text-[10px]">{word.id}</Badge>
        </div>
        <div className="arabic-text text-3xl font-bold mb-2 p-3 bg-white rounded border overflow-hidden leading-[2] text-right">
          {word.arabic}
        </div>
        <div className="text-xs text-muted-foreground">
          {word.translation || 'Translation not available'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-muted/20 rounded border">
          <span className="text-xs font-medium text-muted-foreground block mb-1">Meaning</span>
          <p className="text-primary font-semibold text-sm whitespace-normal break-words">
            {word.meaning || 'Meaning not available'}
          </p>
        </div>
        <div className="p-3 bg-muted/20 rounded border">
          <span className="text-xs font-medium text-muted-foreground block mb-1">Clean Text</span>
          <p className="arabic-text text-base">{word.clean}</p>
        </div>
      </div>

      {word.tajweed.length > 0 && (
        <div className="p-3 bg-muted/20 rounded border">
          <span className="text-sm font-medium text-muted-foreground block mb-2">Tajwīd Rules</span>
          <div className="space-y-2">
            {word.tajweed.map((rule) => (
              <div key={rule} className="flex items-start gap-2">
                <Badge variant="secondary" className="text-xs capitalize">
                  {rule}
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {getTajweedDescription(rule)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleBookmark} className="flex-1">
          <BookmarkPlus className="h-3 w-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCopyWord} title="Copy Arabic">
          <Copy className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-[11px] text-muted-foreground text-center pt-2 border-t">
        Click any word to view details
      </div>
    </div>
  );
}
