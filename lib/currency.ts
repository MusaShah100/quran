export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'PKR' | 'INR' | 'SAR' | 'AED' | 'CAD' | 'AUD';

// Placeholder conversion rates relative to USD
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  PKR: 278,
  INR: 83,
  SAR: 3.75,
  AED: 3.67,
  CAD: 1.34,
  AUD: 1.50,
};

export function convert(amount: number, from: CurrencyCode, to: CurrencyCode) {
  if (!amount || from === to) return amount;
  const usd = amount / RATES[from];
  return Math.round(usd * RATES[to] * 100) / 100;
}

