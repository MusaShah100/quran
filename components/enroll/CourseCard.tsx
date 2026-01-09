'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export type CourseOption = {
  id: string;
  title: string;
  summary: string;
  languages: string[];
};

export function CourseCard({ course, selected, onSelect }: { course: CourseOption; selected: boolean; onSelect: (id: string) => void; }) {
  return (
    <Card
      onClick={() => onSelect(course.id)}
      className={`cursor-pointer transition-all ${selected ? 'ring-2 ring-green-600' : 'hover:shadow-lg'}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {course.languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
            ))}
          </div>
          {selected && <CheckCircle className="w-5 h-5 text-green-600" />}
        </div>
        <CardTitle className="text-base leading-tight">{course.title}</CardTitle>
        <CardDescription className="text-sm">{course.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Modes: {course.languages.join(' / ')}</p>
      </CardContent>
    </Card>
  );
}

