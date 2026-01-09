'use client';

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnrollmentProvider, useEnrollment } from '@/components/enroll/EnrollmentProvider';
import { StepperHeader } from '@/components/enroll/StepperHeader';
import { CourseCard, type CourseOption } from '@/components/enroll/CourseCard';
import { PlanCard, type PlanOption } from '@/components/enroll/PlanCard';
import { SummaryBox } from '@/components/enroll/SummaryBox';
import { CurrencySelector } from '@/components/enroll/CurrencySelector';
import { convert, type CurrencyCode } from '@/lib/currency';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gift, Calculator, Info, CheckCircle2, Home, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

// Age range options
const ageRanges = [
  'Under 10',
  '10-20',
  '20-30',
  '30-40',
  '40-50',
  '50-60',
  '60 and above',
] as const;

// Validation schema for Step 1 — Personal Details
const personalSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  email: z.string().email('Enter valid email'),
  phone: z.string().regex(/^\+\d{1,3}\d{1,10}$/, 'Enter valid phone'),
  country: z.string().min(3, 'Select country'),
  language: z.enum(['Urdu', 'English']),
  age: z.enum(ageRanges, { required_error: 'Select age range' }),
});

// Step 2 — Course options displayed as cards
const courseOptions: CourseOption[] = [
  { id: 'quran-reading', title: "Qur'an Reading (Beginner)", summary: 'Foundation, pronunciation, basic Tajweed, guided 15 Paras', languages: ['Urdu', 'English'] },
  { id: 'tajweed', title: 'Tajweed (Correct Recitation)', summary: 'Master rules, clarity and fluency', languages: ['Urdu', 'English'] },
  { id: 'hifz', title: "Qur'an Memorization (Hifz)", summary: 'Structured memorization with reviews', languages: ['Urdu'] },
  { id: 'kids', title: "Children’s Qur'an Learning", summary: 'Interactive basics and introductory Tajweed', languages: ['Urdu', 'English'] },
];

// Step 3 — Plans with fixed fee ranges
const plans: PlanOption[] = [
  { key: 'base', name: 'Base Plan', classesPerWeek: 2, durationMinutes: '45–50 mins', fixedRange: [20, 30] },
  { key: 'intermediate', name: 'Intermediate Plan', classesPerWeek: 4, durationMinutes: '30–35 mins', fixedRange: [40, 60] },
  { key: 'premium', name: 'Premium Plan', classesPerWeek: 5, durationMinutes: '30–35 mins', fixedRange: [50, 70] },
];

// Wizard orchestrates 4 steps and keeps data in context
function Wizard() {
  const { state, setStep, setPersonal, setCourse, setPlan, setPricingType, setFixedFee, setMonthlyIncome, setCharity, setCurrency, reset } = useEnrollment();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailsSent, setEmailsSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

  const form = useForm<z.infer<typeof personalSchema>>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      fullName: state.personal.fullName,
      email: state.personal.email,
      phone: state.personal.phone,
      country: state.personal.country,
      language: (state.personal.language || 'Urdu') as 'Urdu' | 'English',
      age: (state.personal.age || undefined) as typeof ageRanges[number] | undefined,
    },
  });

  const [countries, setCountries] = useState<{ cca3: string; dial: string; flag: string; name: string }[]>([]);
  const [selectedCca3, setSelectedCca3] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [localNumber, setLocalNumber] = useState<string>('');

  // Memoize country lookups
  const selectedCountry = useMemo(() => countries.find(c => c.cca3 === selectedCca3), [countries, selectedCca3]);
  const countryValue = form.watch('country');
  const countryByFormValue = useMemo(() => {
    return countryValue ? countries.find(c => c.name === countryValue) : null;
  }, [countries, countryValue]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd,flags');
        const data = await res.json();
        const mapped = (data || [])
          .map((c: any) => {
            const root = c?.idd?.root || '';
            const suffix = Array.isArray(c?.idd?.suffixes) && c.idd.suffixes.length > 0 ? c.idd.suffixes[0] : '';
            const dial = `${root}${suffix}`.replace(/[^\d+]/g, '');
            return { cca3: c.cca3, dial, flag: c?.flags?.svg || c?.flags?.png || '', name: c?.name?.common || c?.cca3 };
          })
          .filter((x: any) => x.dial && x.cca3);
        mapped.sort((a: any, b: any) => a.cca3.localeCompare(b.cca3));
        setCountries(mapped);
        const initial = 'USA';
        const found = mapped.find((m: any) => m.cca3 === initial) || mapped[0];
        if (found) {
          setSelectedCca3(found.cca3);
          setDialCode(found.dial.replace(/^\+/, ''));
          form.setValue('phone', `+${found.dial.replace(/^\+/, '')}${localNumber.replace(/\D/g, '')}`);
        }
      } catch { }
    };
    run();
  }, []);

  useEffect(() => {
    if (selectedCca3 && selectedCountry) {
      setDialCode(selectedCountry.dial.replace(/^\+/, ''));
      form.setValue('phone', `+${selectedCountry.dial.replace(/^\+/, '')}${localNumber.replace(/\D/g, '')}`);
    }
  }, [selectedCca3, selectedCountry, localNumber]);

  const onLocalNumberChange = useCallback((v: string) => {
    const digitsRaw = v.replace(/\D/g, '');
    const digits = digitsRaw.slice(0, 10);
    setLocalNumber(digits);
    const code = dialCode.replace(/\D/g, '');
    form.setValue('phone', `+${code}${digits}`, { shouldValidate: false });
  }, [dialCode]);

  useEffect(() => {
    if (state.pricingType === 'fixed' && !state.plan) {
      setPlan('base');
    }
  }, [state.pricingType, state.plan]);

  useEffect(() => {
    if (state.pricingType === 'fixed' && state.plan) {
      const pl = plans.find(p => p.key === state.plan)!;
      const minFee = pl.fixedRange[0];
      if (state.fixedFee == null || state.fixedFee < pl.fixedRange[0] || state.fixedFee > pl.fixedRange[1]) {
        setFixedFee(minFee);
      }
    }
  }, [state.pricingType, state.plan]);

  // Persist personal details and advance to Step 2
  const updatePersonalAndNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    const values = form.getValues();
    setPersonal({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      country: values.country,
      language: values.language,
      age: values.age,
    });
    setStep(2);
  };

  // Compute monthly total in USD (fixed or 2.5% income) + charity
  const totalMonthlyUSD = useMemo(() => {
    let base = 0;
    if (state.pricingType === 'income') {
      base = state.monthlyIncome ? Math.round(convert(state.monthlyIncome, state.currency as CurrencyCode, 'USD') * 0.025 * 100) / 100 : 0;
    } else {
      base = state.fixedFee ?? 0;
    }
    const charityUSD = state.charity ? convert(state.charity, state.currency as CurrencyCode, 'USD') : 0;
    return base + charityUSD;
  }, [state.pricingType, state.fixedFee, state.monthlyIncome, state.charity, state.currency]);

  // Convert total to selected currency (placeholder conversion)
  const totalInCurrency = useMemo(() => convert(totalMonthlyUSD, 'USD', state.currency as CurrencyCode), [totalMonthlyUSD, state.currency]);

  // Memoize selected plan to avoid repeated .find() calls
  const selectedPlan = useMemo(() => state.plan ? plans.find(p => p.key === state.plan) : null, [state.plan]);
  
  // Memoize selected course to avoid repeated .find() calls
  const selectedCourse = useMemo(() => state.selectedCourseId ? courseOptions.find(c => c.id === state.selectedCourseId) : null, [state.selectedCourseId]);
  
  // Memoize currency conversions for plan ranges
  const planMinFee = useMemo(() => selectedPlan ? convert(selectedPlan.fixedRange[0], 'USD', state.currency as CurrencyCode) : 0, [selectedPlan, state.currency]);
  const planMaxFee = useMemo(() => selectedPlan ? convert(selectedPlan.fixedRange[1], 'USD', state.currency as CurrencyCode) : 0, [selectedPlan, state.currency]);
  const currentFeeDisplay = useMemo(() => {
    const fee = state.fixedFee ?? (selectedPlan ? selectedPlan.fixedRange[0] : 0);
    return convert(fee, 'USD', state.currency as CurrencyCode);
  }, [state.fixedFee, selectedPlan, state.currency]);
  
  // Memoize calculated income fee
  const calculatedIncomeFee = useMemo(() => {
    if (!state.monthlyIncome) return 0;
    const usdAmount = convert(state.monthlyIncome, state.currency as CurrencyCode, 'USD');
    const feeUSD = Math.round(usdAmount * 0.025 * 100) / 100;
    return convert(feeUSD, 'USD', state.currency as CurrencyCode);
  }, [state.monthlyIncome, state.currency]);

  return (
    <div className="container max-w-7xl py-6">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Course Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <StepperHeader step={state.step} />

          {state.step === 1 && (
            <div className="space-y-4 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" required>Full Name</Label>
                  <Input id="fullName" {...form.register('fullName')} />
                  {form.formState.errors.fullName && (<p className="text-red-600 text-xs mt-1">{form.formState.errors.fullName.message}</p>)}
                </div>
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input id="email" type="email" {...form.register('email')} />
                  {form.formState.errors.email && (<p className="text-red-600 text-xs mt-1">{form.formState.errors.email.message}</p>)}
                </div>
                <div>
                  <Label required>Phone Number</Label>
                  <div className="flex gap-2">
                    <Select value={selectedCca3} onValueChange={(v) => setSelectedCca3(v)}>
                      <SelectTrigger className="w-40">
                        <div className="flex items-center gap-2 w-full justify-between">
                          {selectedCountry?.flag && (
                            <img src={selectedCountry.flag} alt="flag" className="h-4 w-6 rounded-sm" />
                          )}
                          <span className="text-xs">{selectedCca3 || 'Select'}</span>
                          <span className="text-xs">+{dialCode}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-72 w-64">
                        {countries.map((c) => (
                          <SelectItem key={c.cca3} value={c.cca3} className="py-2 pl-3 pr-3">
                            <div className="flex items-center gap-2">
                              {c.flag && <img src={c.flag} alt="flag" className="h-4 w-6 rounded-sm" />}
                              <span className="text-xs font-medium">{c.cca3}</span>
                              <span className="text-xs text-muted-foreground">+{c.dial.replace(/^\+/, '')}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Input
                        id="phone"
                        placeholder="555 123 4567"
                        maxLength={10}
                        value={localNumber}
                        onChange={(e) => onLocalNumberChange(e.target.value)}
                      />
                      <input type="hidden" {...form.register('phone')} />
                    </div>
                  </div>
                  {form.formState.errors.phone && (<p className="text-red-600 text-xs mt-1">{form.formState.errors.phone.message}</p>)}
                  {form.formState.errors.country && (<p className="text-red-600 text-xs mt-1">{form.formState.errors.country.message}</p>)}
                </div>
                <div>
                  <Label required>Country</Label>
                  <Select value={countryValue || undefined} onValueChange={(v) => form.setValue('country', v)}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        {countryByFormValue?.flag && (
                          <img src={countryByFormValue.flag} alt="flag" className="h-4 w-6 rounded-sm" />
                        )}
                        <span className="text-sm">{countryValue || 'Select country'}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-72 w-full">
                      {countries.map((c) => (
                        <SelectItem key={c.cca3} value={c.name} className="py-2 pl-3 pr-3">
                          <div className="flex items-center gap-2">
                            {c.flag && <img src={c.flag} alt="flag" className="h-4 w-6 rounded-sm" />}
                            <span className="text-sm font-medium">{c.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label required>Preferred Language</Label>
                  <Select defaultValue={form.getValues('language')} onValueChange={(v) => form.setValue('language', v as 'Urdu' | 'English')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age" required>Age</Label>
                  <Select value={form.getValues('age') || undefined} onValueChange={(v) => form.setValue('age', v as typeof ageRanges[number])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.age && (<p className="text-red-600 text-xs mt-1">{form.formState.errors.age.message}</p>)}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={updatePersonalAndNext}>Next</Button>
              </div>
            </div>
          )}

          {state.step === 2 && (
            <div className="space-y-5 transition-all duration-300">
              <div className="space-y-2">
                <Label required>Course</Label>
                <Select value={state.selectedCourseId ?? undefined} onValueChange={(v) => setCourse(v)}>
                  <SelectTrigger className="w-full">
                    <span className="text-sm">
                      {selectedCourse ? selectedCourse.title : 'Select a course'}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {courseOptions.map((c) => (
                      <SelectItem
                        key={c.id}
                        value={c.id}
                        className="py-3 pl-3 pr-3 hover:bg-muted focus:bg-muted data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-900 [&>span:first-child]:hidden"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium leading-tight">{c.title}</span>
                          <span className="text-xs text-muted-foreground">{c.summary}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{selectedCourse.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedCourse.summary}</p>
                        <p className="text-xs text-muted-foreground mt-1">Modes: {selectedCourse.languages.join(' / ')}</p>
                      </div>
                      <div className="px-3 py-2 rounded-md border text-sm font-semibold flex items-center gap-2 bg-emerald-200 text-emerald-900 border-emerald-400">
                        <Gift className="h-4 w-4" />
                        <span>Free Duas Course included</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button disabled={!state.selectedCourseId} onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {state.step === 3 && (
            <div className="space-y-6 transition-all duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((p) => (
                  <PlanCard key={p.key} plan={p} selected={state.plan === p.key} onSelect={setPlan} currency={state.currency as CurrencyCode} />
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label>Currency</Label>
                      <div className="mt-2">
                        <CurrencySelector value={state.currency as CurrencyCode} onChange={(c) => setCurrency(c)} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="charity">Optional Charity ({state.currency})</Label>
                      <div className="mt-2">
                        <Input id="charity" type="number" min={0} value={state.charity ?? ''} onChange={(e) => {
                          const val = e.target.value;
                          setCharity(val ? Number(val) : null);
                        }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label required>Pricing Type</Label>
                    <RadioGroup value={state.pricingType} onValueChange={(v) => setPricingType(v as 'fixed' | 'income')} className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed" id="fixed" />
                        <Label htmlFor="fixed">Fixed Price</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
                        <Label htmlFor="income">Income-Based</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {state.pricingType === 'fixed' && selectedPlan && (
                    <div>
                      <Label required>
                        Choose your monthly fee (
                        {planMinFee}–{planMaxFee} {state.currency}
                        )
                      </Label>
                      <div className="grid grid-cols-12 gap-4 mt-2 items-center">
                        <div className="col-span-9">
                          <Slider
                            value={[state.fixedFee ?? selectedPlan.fixedRange[0]]}
                            min={selectedPlan.fixedRange[0]}
                            max={selectedPlan.fixedRange[1]}
                            step={1}
                            onValueChange={(v) => setFixedFee(v[0])}
                          />
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="inline-block font-semibold">
                            {currentFeeDisplay} {state.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {state.pricingType === 'income' && (
                    <div>
                      <Label htmlFor="income" required>Enter your monthly family income ({state.currency})</Label>
                      <div className="grid md:grid-cols-2 gap-6 mt-2 items-start">
                        <div>
                          <Input id="income" type="number" min={0} value={state.monthlyIncome ?? ''} onChange={(e) => {
                            const val = e.target.value;
                            setMonthlyIncome(val ? Number(val) : null);
                          }} className="h-10" />
                          <p className="text-xs text-muted-foreground mt-1">2.5% applies automatically</p>
                        </div>
                        <div className="flex items-center">
                          <div className="rounded-lg border bg-emerald-50 px-4 py-3 flex items-center justify-between w-full h-10">
                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-900">
                              <Calculator className="h-4 w-4" />
                              <span>Calculated Fee</span>
                            </div>
                            <span className="text-emerald-700 font-bold text-xl">
                              {calculatedIncomeFee} {state.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg border bg-blue-50 px-4 py-3 flex items-center gap-3 border-blue-200">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Note:</span> Class timing will be discussed once your registration is completed.
                    </p>
                  </div>
                </div>

                <div className="lg:sticky lg:top-24">
                  <SummaryBox
                    items={[
                      { label: 'Selected Course', value: selectedCourse ? selectedCourse.title : '—' },
                      { label: 'Selected Plan', value: selectedPlan ? selectedPlan.name : '—' },
                      { label: 'Fee Type', value: state.pricingType === 'fixed' ? 'Fixed Price' : 'Income-Based' },
                      { label: 'Bonus Dua', value: state.bonusDuaIncluded ? 'Included' : '—' },
                    ]}
                    total={`${totalInCurrency} ${state.currency}`}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} disabled={!state.plan || (state.pricingType === 'fixed' && !state.fixedFee) || (state.pricingType === 'income' && !state.monthlyIncome)}>Next</Button>
              </div>
            </div>
          )}

          {state.step === 4 && (
            <div className="space-y-6 transition-all duration-300">
              <SummaryBox
                items={[
                  { label: 'Full Name', value: state.personal.fullName },
                  { label: 'Email', value: state.personal.email },
                  { label: 'Phone', value: state.personal.phone },
                  { label: 'Country', value: state.personal.country },
                  { label: 'Preferred Language', value: state.personal.language || '—' },
                  { label: 'Selected Course', value: selectedCourse ? selectedCourse.title : '—' },
                  { label: 'Selected Plan', value: selectedPlan ? selectedPlan.name : '—' },
                  { label: 'Fee Type', value: state.pricingType === 'fixed' ? 'Fixed Price' : 'Income-Based' },
                  { label: 'Charity', value: `${state.charity ?? 0} ${state.currency}` },
                ]}
                total={`${totalInCurrency} ${state.currency}`}
              />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button 
                  onClick={async () => {
                    setIsSubmitting(true);
                    setShowLoadingModal(true);
                    
                    const payload = {
                      personal: state.personal,
                      courseId: state.selectedCourseId,
                      plan: state.plan,
                      pricingType: state.pricingType,
                      fixedFee: state.fixedFee,
                      monthlyIncome: state.monthlyIncome,
                      charity: state.charity ?? 0,
                      currency: state.currency,
                      totalMonthlyUSD,
                      totalInCurrency,
                      bonusDuaIncluded: state.bonusDuaIncluded,
                    };
                    try {
                      const res = await fetch('/api/enroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                      const result = await res.json();
                      if (!res.ok) {
                        throw new Error(result.error || 'Submission failed');
                      }
                      // Store email before resetting
                      setSubmittedEmail(state.personal.email);
                      setEmailsSent(result.emailsSent || false);
                      // Reset form to step 1
                      reset();
                      // Reset form fields
                      form.reset();
                      // Hide loading modal and show success modal
                      setShowLoadingModal(false);
                      setIsSubmitting(false);
                      setShowSuccessModal(true);
                    } catch (e) {
                      const errorMessage = e instanceof Error ? e.message : 'Submission failed. Please try again.';
                      setShowLoadingModal(false);
                      setIsSubmitting(false);
                      toast.error(errorMessage);
                      console.error('Enrollment submission error:', e);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Confirm & Submit'
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading/Submitting Modal */}
      <Dialog open={showLoadingModal} onOpenChange={() => {}}>
        <DialogContent 
          className="sm:max-w-[450px]" 
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="[&>button]:hidden">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-4">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                </div>
              </div>
              <DialogTitle className="text-xl text-center">Submitting Your Enrollment</DialogTitle>
              <DialogDescription className="text-center text-base pt-4">
                Please wait while we process your enrollment...
                <br />
                <span className="text-sm text-muted-foreground mt-2 block">
                  This may take a few moments. Please do not close this window.
                </span>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">Enrollment Successful!</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {emailsSent ? (
                <>
                  Thank you for enrolling! Your enrollment has been submitted successfully.
                  <br />
                  <span className="font-semibold text-green-600 mt-2 block">
                    A confirmation email has been sent to {submittedEmail || 'your email'}.
                  </span>
                  <br />
                  Our team will contact you within 24 hours to discuss class timings and finalize your enrollment.
                </>
              ) : (
                <>
                  Your enrollment has been submitted successfully!
                  <br />
                  <span className="font-semibold text-green-600 mt-2 block">
                    You will receive a confirmation email within 24 hours.
                  </span>
                  <br />
                  Our team will contact you soon to discuss class timings and finalize your enrollment.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-center pt-4">
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                router.push('/');
              }}
              className="w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Home Page
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessModal(false);
                // Form is already reset, user can start a new enrollment
              }}
              className="w-full sm:w-auto"
            >
              Start New Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function EnrollPage() {
  const params = useSearchParams();
  const initialCourseId = params.get('course') ?? undefined;
  return (
    <EnrollmentProvider initialCourseId={initialCourseId}>
      <Wizard />
    </EnrollmentProvider>
  );
}
