'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Banknote } from 'lucide-react';

export function SummaryBox({ items, total }: { items: { label: string; value: string; }[]; total?: string; }) {
  return (
    <Card className="border-emerald-300 bg-emerald-50 rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-100 text-emerald-900 border-emerald-300">Summary</Badge>
          {/* <Banknote className="h-4 w-4 text-emerald-700" /> */}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it) => (
          <div key={it.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{it.label}</span>
            <span className="font-semibold">{it.value}</span>
          </div>
        ))}
        {total && (
          <div className="mt-2 rounded-md bg-white border border-emerald-200 px-3 py-2 flex items-center justify-between">
            <span className="font-semibold">Total per Month</span>
            <span className="text-emerald-700 font-bold text-lg">{total}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
