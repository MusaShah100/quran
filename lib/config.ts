/**
 * Centralized configuration file for pricing, courses, and other configurable values
 * Update values here to reflect changes across all pages
 */

// ============================================
// PRICING CONFIGURATION
// ============================================

/**
 * Income-based pricing percentage (as decimal)
 * Example: 0.025 = 2.5%
 * NOTE: This is now plan-specific. Use plan.incomePercentage instead.
 * @deprecated Use plan.incomePercentage for plan-specific percentages
 */
export const INCOME_BASED_PERCENTAGE = 0.025; // 2.5% (deprecated - use plan-specific percentages)

/**
 * Base currency for all pricing (all prices are stored in this currency)
 */
export const BASE_CURRENCY = 'USD' as const;

// ============================================
// PLAN CONFIGURATION
// ============================================

export type PlanKey = 'base' | 'intermediate' | 'premium';

export interface PlanConfig {
  key: PlanKey;
  name: string;
  classesPerWeek: number;
  durationMinutes: string;
  fixedRange: [number, number]; // [min, max] in BASE_CURRENCY
  incomePercentage: number; // Income-based percentage (as decimal, e.g., 0.02 = 2%)
  popular?: boolean; // Mark as "Most Popular"
}

/**
 * Pricing plans configuration
 * Prices are in BASE_CURRENCY (USD)
 */
export const PLANS: PlanConfig[] = [
  {
    key: 'base',
    name: 'Base Plan',
    classesPerWeek: 2,
    durationMinutes: '45–50 mins',
    fixedRange: [20, 30], // $20-$30 USD per month
    incomePercentage: 0.02, // 2% of monthly family income
  },
  {
    key: 'intermediate',
    name: 'Intermediate Plan',
    classesPerWeek: 4,
    durationMinutes: '30–35 mins',
    fixedRange: [40, 50], // $40-$50 USD per month
    incomePercentage: 0.025, // 2.5% of monthly family income
    popular: true, // Marked as "Most Popular"
  },
  {
    key: 'premium',
    name: 'Premium Plan',
    classesPerWeek: 5,
    durationMinutes: '30–35 mins',
    fixedRange: [50, 70], // $50-$70 USD per month
    incomePercentage: 0.03, // 3% of monthly family income
  },
];

// ============================================
// COURSE CONFIGURATION
// ============================================

import type { LucideIcon } from 'lucide-react';
import { Users, BookOpen, GraduationCap, Award, Heart } from 'lucide-react';
export type Language = 'Urdu' | 'English';

export interface CourseConfig {
  id: string;
  title: string;
  summary: string;
  languages: Language[];
  badge?: 'Children Only' | 'All Ages';
  topics?: string[];
  icon?: LucideIcon;
}

/**
 * Available course options
 */
export const COURSES: CourseConfig[] = [
  {
    id: 'quran-reading',
    title: "Qur'an Reading (Beginner)",
    summary: 'Foundation, pronunciation, basic Tajweed, guided 15 Paras',
    languages: ['Urdu', 'English'],
    badge: 'All Ages',
    topics: ['Arabic alphabet & pronunciation', 'Basic Tajweed rules', 'Read Quran with guidance'],
    icon: BookOpen,
  },
  {
    id: 'tajweed',
    title: 'Tajweed (Correct Recitation)',
    summary: 'Master rules, clarity and fluency',
    languages: ['Urdu', 'English'],
    badge: 'All Ages',
    topics: ['Detailed Tajweed rules', 'Correct Arabic pronunciation', 'Fluency and clarity'],
    icon: GraduationCap,
  },
  {
    id: 'kids',
    title: "Children's Qur'an Learning",
    summary: 'Interactive basics and introductory Tajweed',
    languages: ['Urdu', 'English'],
    badge: 'Children Only',
    topics: ['Basic Islamic concepts', 'Fun, engaging activities', 'Intro to Tajweed & recitation'],
    icon: Users,
  },
  {
    id: 'hifz',
    title: "Qur'an Memorization (Hifz)",
    summary: 'Structured memorization with reviews',
    languages: ['Urdu'],
    badge: 'All Ages',
    topics: ['Memorization techniques', 'Personalized Hifz plan', 'Regular reviews & retention'],
    icon: Award,
  },
  {
    id: 'duas',
    title: 'Islamic Duas & Supplications',
    summary: 'Learn daily duas with meanings, significance, and etiquette',
    languages: ['Urdu', 'English'],
    badge: 'All Ages',
    topics: ['Daily duas & occasions', 'Meanings & significance', 'Pronunciation & etiquette'],
    icon: Heart,
  },
];

// ============================================
// ENROLLMENT CONFIGURATION
// ============================================

/**
 * Age range options for enrollment
 */
export const AGE_RANGES = [
  'Under 10',
  '10-20',
  '20-30',
  '30-40',
  '40-50',
  '50-60',
  '60 and above',
] as const;

export type AgeRange = typeof AGE_RANGES[number];

/**
 * Available languages for enrollment
 */
export const ENROLLMENT_LANGUAGES: Language[] = ['Urdu', 'English'];

// ============================================
// FEATURE FLAGS & OTHER CONFIG
// ============================================

/**
 * Whether to include bonus Dua course with enrollment
 */
export const BONUS_DUA_INCLUDED = true;

/**
 * Default currency for display (can be overridden by user selection)
 */
export const DEFAULT_CURRENCY = 'USD' as const;

/**
 * Helper function to calculate income-based fee
 * @param monthlyIncome - Monthly income in any currency
 * @param percentage - Percentage as decimal (e.g., 0.02 for 2%)
 * @returns Calculated fee
 */
export function calculateIncomeBasedFee(monthlyIncome: number, percentage?: number): number {
  const percent = percentage ?? INCOME_BASED_PERCENTAGE;
  return monthlyIncome * percent;
}

/**
 * Get plan by key
 */
export function getPlanByKey(key: PlanKey): PlanConfig | undefined {
  return PLANS.find(plan => plan.key === key);
}

/**
 * Get course by ID
 */
export function getCourseById(id: string): CourseConfig | undefined {
  return COURSES.find(course => course.id === id);
}
