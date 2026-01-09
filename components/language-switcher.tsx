'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-1.5 gap-0.5">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={cn(
            "cursor-pointer px-2.5 py-2.5 flex items-center justify-between rounded-md",
            "transition-all duration-150",
            "focus:outline-none focus:ring-0",
            "hover:text-foreground focus:text-foreground",
            // Override default accent (green) colors
            "hover:bg-muted/50 focus:bg-muted/50",
            "data-[highlighted]:bg-muted/50 data-[highlighted]:text-foreground",
            // Selected state - subtle gray background with visible text
            language === 'en' 
              ? "bg-muted/80 hover:bg-muted focus:bg-muted text-foreground" 
              : "text-foreground"
          )}
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">EN</span>
            <span className={cn(
              "text-xs font-normal text-foreground",
              language === 'en' && "text-primary font-medium"
            )}>English</span>
          </div>
          {language === 'en' && (
            <Check className="h-3.5 w-3.5 text-primary ml-2 flex-shrink-0" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ur')}
          className={cn(
            "cursor-pointer px-2.5 py-2.5 flex items-center justify-between rounded-md",
            "transition-all duration-150",
            "focus:outline-none focus:ring-0",
            "hover:text-foreground focus:text-foreground",
            // Override default accent (green) colors
            "hover:bg-muted/50 focus:bg-muted/50",
            "data-[highlighted]:bg-muted/50 data-[highlighted]:text-foreground",
            // Selected state - subtle gray background with visible text
            language === 'ur' 
              ? "bg-muted/80 hover:bg-muted focus:bg-muted text-foreground" 
              : "text-foreground"
          )}
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">PK</span>
            <span className={cn(
              "text-xs font-normal text-foreground",
              language === 'ur' && "text-primary font-medium"
            )}>اردو</span>
          </div>
          {language === 'ur' && (
            <Check className="h-3.5 w-3.5 text-primary ml-2 flex-shrink-0" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

