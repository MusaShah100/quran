'use client';

import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { CurrencyCode } from '@/lib/currency';

const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'PKR', 'INR', 'SAR', 'AED', 'CAD', 'AUD'];

export function CurrencySelector({ value, onChange }: { value: CurrencyCode; onChange: (v: CurrencyCode) => void; }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as CurrencyCode)}>
      <SelectTrigger className="w-full">
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
