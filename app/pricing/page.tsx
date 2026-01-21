'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { CurrencySelector } from '@/components/enroll/CurrencySelector';
import { convert, type CurrencyCode } from '@/lib/currency';
import {
  DollarSign,
  Calculator,
  CheckCircle2,
  Clock,
  Layers,
  Gift,
  Info,
  ArrowRight,
  TrendingUp,
  Scale,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import {
  PLANS,
  COURSES,
  BASE_CURRENCY,
  calculateIncomeBasedFee
} from '@/lib/config';

export default function PricingPage() {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  return (
    <div className="container py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Affordable & Flexible Qur'an Learning for Every Family
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
          We believe Qur'anic education should be accessible, fair, and stress-free. That's why we offer two flexible pricing options so families can choose what suits them best — without compromising on teaching quality.
        </p>

        {/* Same Quality Guarantee */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-12">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-900">Same Quality, Different Pricing</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">Same teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">Same live classes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">Same learning quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">Only the pricing method differs</span>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="mt-6 flex justify-center">
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </div>


      {/* Pricing Tabs */}
      <Tabs defaultValue="fixed" className="mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="fixed" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Option 1: Fixed Pricing
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Option 2: Income-Based
          </TabsTrigger>
        </TabsList>

        {/* Fixed Pricing Tab */}
        <TabsContent value="fixed" className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">🔹 OPTION 1: FIXED PRICING</h2>
            <p className="text-muted-foreground">
              Best for families who prefer simple, predictable monthly fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {PLANS.map((plan) => (
              <Card key={plan.key} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {plan.classesPerWeek} classes/week
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>({plan.durationMinutes})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pt-4 border-t">
                      <div className="mb-2">
                        <span className="text-3xl font-bold">
                          {convert(plan.fixedRange[0], BASE_CURRENCY, currency)}
                        </span>
                        <span className="text-muted-foreground"> – </span>
                        <span className="text-3xl font-bold">
                          {convert(plan.fixedRange[1], BASE_CURRENCY, currency)}
                        </span>
                        <span className="text-muted-foreground text-sm"> / month</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {currency} per month
                      </p>
                    </div>

                    <Button asChild className="w-full mt-6">
                      <Link href="/enroll">
                        Get Free Trial Class
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Income-Based Pricing Tab */}
        <TabsContent value="income" className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">🔹 OPTION 2: INCOME-BASED PRICING</h2>
            <p className="text-muted-foreground mb-2">
              <span className="font-semibold">(Our commitment to fairness)</span>
            </p>
            <p className="text-muted-foreground">
              With Income-Based Pricing, your fee is calculated as a small percentage of your family's monthly income, so learning remains affordable for everyone.
            </p>
          </div>

          {/* Income-Based Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {PLANS.map((plan) => (
              <Card key={plan.key} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {plan.classesPerWeek} classes/week
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>({plan.durationMinutes})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pt-4 border-t">
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-primary">
                          {(plan.incomePercentage * 100).toFixed(1)}%
                        </span>
                        <span className="text-muted-foreground text-sm"> of monthly family income</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Base: {plan.key === 'base' ? '2%' : plan.key === 'intermediate' ? '2.5%' : '3%'}
                      </p>
                    </div>

                    <Button asChild className="w-full mt-6">
                      <Link href="/enroll">
                        Get Free Trial Class
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-emerald-50 border-emerald-200 mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-emerald-900 mb-3">Why choose Income-Based Pricing?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-800">Pay according to what you earn</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-800">Reduces financial pressure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-800">Promotes equal access to Qur'anic education</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works Section */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>HOW IT WORKS (INCOME-BASED)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Select an Income-Based plan</h4>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter your monthly family income during registration</h4>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Your fee is calculated automatically</h4>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Example:</h4>
                <p className="text-sm mb-2">
                  If your family income is {currency} 1,000 and you choose the Base Plan (2%), your monthly fee will be {convert(calculateIncomeBasedFee(1000, 0.02), BASE_CURRENCY, currency)} {currency}.
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">📌 Lower income → lower fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">📌 No documents required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">📌 Based on trust and honesty</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/enroll">Get Free Trial Class</Link>
                </Button>
                <Button asChild>
                  <Link href="/enroll">Calculate Your Income-Based Fee</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Same Quality Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-12">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold">SAME QUALITY FOR EVERY STUDENT</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            No matter which plan you choose:
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">Same experienced teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">Same live classes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">Same focus on correct Tajweed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">Same student support</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 font-semibold">
            Only the fee calculation changes — not the learning.
          </p>
        </CardContent>
      </Card>

      {/* Quick Pricing Questions */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>QUICK PRICING QUESTIONS</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="compulsory">
              <AccordionTrigger className="text-left">
                Is Income-Based Pricing compulsory?
              </AccordionTrigger>
              <AccordionContent>
                No. You may choose Fixed Pricing if you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="proof">
              <AccordionTrigger className="text-left">
                Do I need to show income proof?
              </AccordionTrigger>
              <AccordionContent>
                No. We rely on honesty and transparency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="change">
              <AccordionTrigger className="text-left">
                Can I change my plan later?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Simply contact our team.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Start with Free Trial */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 mb-12">
        <CardContent className="pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">🚀 START WITH A FREE TRIAL</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We encourage every family to begin with a free trial class before choosing a plan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">No payment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Meet the teacher</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Experience our teaching approach</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/enroll">
                Get Free Trial Class
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/enroll">
                Get Registered
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Both buttons follow the same steps; only the heading differs. Admin receives the same email subject for both.
          </p>
        </CardContent>
      </Card>

      {/* Our Promise */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className="pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-emerald-900">🌿 OUR PROMISE</h2>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Our pricing model is built on fairness, transparency, and care — so every student can learn the Qur'an with confidence and dignity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
