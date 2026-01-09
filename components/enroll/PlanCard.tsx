'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Layers } from 'lucide-react';
import { convert, type CurrencyCode } from '@/lib/currency';

export type PlanOption = {
  key: 'base' | 'intermediate' | 'premium';
  name: string;
  classesPerWeek: number;
  durationMinutes: string;
  fixedRange: [number, number];
};

export function PlanCard({ plan, selected, onSelect, currency }: { plan: PlanOption; selected: boolean; onSelect: (key: PlanOption['key']) => void; currency: CurrencyCode; }) {
  return (
    <Card
      onClick={() => onSelect(plan.key)}
      className={`group cursor-pointer transition-all rounded-xl border ${selected ? 'ring-2 ring-emerald-600 bg-emerald-50 border-emerald-200' : 'hover:shadow-lg hover:border-emerald-300'} min-h-[180px]`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className={`h-4 w-4 ${selected ? 'text-emerald-700' : 'text-muted-foreground'}`} />
            <CardTitle className="text-base">{plan.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white">{plan.classesPerWeek} classes/week</Badge>
            {selected && <CheckCircle className="w-6 h-6 text-emerald-600 stroke-[3]" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{plan.durationMinutes}</span>
            </div>
            <p className="text-sm"><span className="font-semibold">Fixed:</span> {convert(plan.fixedRange[0], 'USD', currency)}–{convert(plan.fixedRange[1], 'USD', currency)} {currency} / mo</p>
            <p className="text-xs text-muted-foreground">Income-based: 2.5% of monthly income</p>
          </div>
          <div className={`px-3 py-2 rounded-md text-sm font-semibold ${selected ? 'bg-emerald-200 text-emerald-900' : 'bg-muted text-foreground'}`}>Select</div>
        </div>
      </CardContent>
    </Card>
  );
}
