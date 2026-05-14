'use client';

import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { CurrencyCode } from '@/lib/currency';
import { cn } from '@/lib/utils';

const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'PKR', 'INR', 'SAR', 'AED', 'CAD', 'AUD'];

export function CurrencySelector({
  value,
  onChange,
  size = 'md',
  className,
}: {
  value: CurrencyCode;
  onChange: (v: CurrencyCode) => void;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const triggerClasses = cn(
    'w-full',
    size === 'sm' ? 'h-8 text-xs' : 'h-10',
    className
  );
  return (
    <Select value={value} onValueChange={(v) => onChange(v as CurrencyCode)}>
      <SelectTrigger className={triggerClasses}>
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c} value={c}>{c}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
