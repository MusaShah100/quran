'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
// Centralized state management for the enrollment wizard
// Provides actions to update each step's data and progression

export type PersonalDetails = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  language: 'Urdu' | 'English' | '';
  age: string;
};

export type PricingType = 'fixed' | 'income';

export type PlanKey = 'base' | 'intermediate' | 'premium';

export type EnrollmentState = {
  step: number;
  personal: PersonalDetails;
  selectedCourseId: string | null;
  pricingType: PricingType;
  plan: PlanKey | null;
  fixedFee: number | null; // chosen fixed monthly fee
  monthlyIncome: number | null; // for income-based
  charity: number | null; // optional additional donation
  currency: string; // e.g., 'USD'
  bonusDuaIncluded: boolean;
};

type EnrollmentContextValue = {
  state: EnrollmentState;
  setPersonal: (p: Partial<PersonalDetails>) => void;
  setCourse: (id: string | null) => void;
  setStep: (s: number) => void;
  setPlan: (p: PlanKey | null) => void;
  setPricingType: (t: PricingType) => void;
  setFixedFee: (fee: number | null) => void;
  setMonthlyIncome: (income: number | null) => void;
  setCharity: (c: number | null) => void;
  setCurrency: (c: string) => void;
  reset: () => void;
};

const EnrollmentContext = createContext<EnrollmentContextValue | undefined>(undefined);

export function EnrollmentProvider({ children, initialCourseId }: { children: React.ReactNode; initialCourseId?: string; }) {
  const [state, setState] = useState<EnrollmentState>({
    step: 1,
    personal: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      language: '',
      age: ''
    },
    selectedCourseId: initialCourseId ?? null,
    pricingType: 'fixed',
    plan: null,
    fixedFee: null,
    monthlyIncome: null,
    charity: null,
    currency: 'USD',
    bonusDuaIncluded: false,
  });

  const setStepFn = React.useCallback((s: number) => setState(prev => ({ ...prev, step: s })), []);
  const setPersonalFn = React.useCallback((p: Partial<PersonalDetails>) => setState(prev => ({ ...prev, personal: { ...prev.personal, ...p } })), []);
  const setCourseFn = React.useCallback((id: string | null) => setState(prev => ({ ...prev, selectedCourseId: id, bonusDuaIncluded: id ? isBonusEligible(id) : false })), []);
  const setPlanFn = React.useCallback((p: PlanKey | null) => setState(prev => ({ ...prev, plan: p })), []);
  const setPricingTypeFn = React.useCallback((t: PricingType) => setState(prev => ({ ...prev, pricingType: t })), []);
  const setFixedFeeFn = React.useCallback((fee: number | null) => setState(prev => ({ ...prev, fixedFee: fee })), []);
  const setMonthlyIncomeFn = React.useCallback((income: number | null) => setState(prev => ({ ...prev, monthlyIncome: income })), []);
  const setCharityFn = React.useCallback((c: number | null) => setState(prev => ({ ...prev, charity: c })), []);
  const setCurrencyFn = React.useCallback((c: string) => setState(prev => ({ ...prev, currency: c })), []);
  const resetFn = React.useCallback(() => setState({
    step: 1,
    personal: { fullName: '', email: '', phone: '', country: '', language: '', age: '' },
    selectedCourseId: null,
    pricingType: 'fixed',
    plan: null,
    fixedFee: null,
    monthlyIncome: null,
    charity: null,
    currency: 'USD',
    bonusDuaIncluded: false,
  }), []);

  const value = useMemo<EnrollmentContextValue>(() => ({
    state,
    setStep: setStepFn,
    setPersonal: setPersonalFn,
    setCourse: setCourseFn,
    setPlan: setPlanFn,
    setPricingType: setPricingTypeFn,
    setFixedFee: setFixedFeeFn,
    setMonthlyIncome: setMonthlyIncomeFn,
    setCharity: setCharityFn,
    setCurrency: setCurrencyFn,
    reset: resetFn,
  }), [state, setStepFn, setPersonalFn, setCourseFn, setPlanFn, setPricingTypeFn, setFixedFeeFn, setMonthlyIncomeFn, setCharityFn, setCurrencyFn, resetFn]);

  return (
    <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollment must be used within EnrollmentProvider');
  return ctx;
}

function isBonusEligible(courseId: string) {
  return ['quran-reading', 'tajweed', 'hifz', 'kids'].includes(courseId);
}
