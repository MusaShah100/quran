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
  Check,
  Clock,
  Layers,
  Gift,
  Info,
  ArrowRight,
  TrendingUp,
  Scale,
  HelpCircle,
  Sparkles,
  GraduationCap,
  Video,
  Award,
  Tags,
  PieChart,
  HeartHandshake,
  Globe,
  BookOpen,
  Headphones,
  CreditCard,
  User,
  Lightbulb,
  Rocket
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
  const [pricingMode, setPricingMode] = useState('fixed');

  return (
    <div className="container py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16 pt-4">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
          <Sparkles className="w-4 h-4 mr-2" />
          Accessible Islamic Education
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Affordable & Flexible <br className="hidden md:block" />
          <span className="text-primary relative inline-block">
            Qur'an Learning
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10 pr-3" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span> 
            for Every Family
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          We believe Qur'anic education should be accessible, fair, and stress-free. 
          That's why we offer two flexible pricing options so families can choose what suits them best.
        </p>

        {/* Same Quality Guarantee */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white dark:bg-card rounded-2xl shadow-xl border border-border/50 p-1 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 z-10"></div>
             <div className="bg-green-50/50 dark:bg-green-900/10 rounded-xl p-6 md:p-8 border border-green-100 dark:border-green-900/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex items-center gap-4 min-w-fit">
                  <div className="bg-white dark:bg-background p-3 rounded-full shadow-sm border border-green-100 dark:border-green-900/20">
                    <Scale className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground">Fairness Guarantee</h3>
                    <p className="text-sm text-muted-foreground">Same quality, different ways to pay</p>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-green-200/50 dark:bg-green-800/50"></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                  <div className="flex flex-col items-center justify-start gap-2 text-center group h-full">
                    <div className="bg-white dark:bg-background p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm border border-green-50 dark:border-green-900/20">
                      <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Same Teachers</span>
                  </div>
                  <div className="flex flex-col items-center justify-start gap-2 text-center group h-full">
                    <div className="bg-white dark:bg-background p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm border border-green-50 dark:border-green-900/20">
                      <Video className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Same Live Classes</span>
                  </div>
                  <div className="flex flex-col items-center justify-start gap-2 text-center group h-full">
                    <div className="bg-white dark:bg-background p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm border border-green-50 dark:border-green-900/20">
                      <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Same Quality</span>
                  </div>
                  <div className="flex flex-col items-center justify-start gap-2 text-center group h-full">
                    <div className="bg-white dark:bg-background p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm border border-green-50 dark:border-green-900/20">
                      <Tags className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Only Price Differs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Pricing Tabs */}
      <Tabs value={pricingMode} onValueChange={setPricingMode} className="mb-12">
        <div className="flex flex-col items-center justify-center relative mb-8 gap-4">
          <div className="flex items-center gap-2 bg-card p-1.5 pl-3 rounded-lg border shadow-sm md:absolute md:right-0 z-10">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Currency:</span>
            <div className="w-[100px]">
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-card border-2 rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden transition-all duration-300 ${
          pricingMode === 'fixed' 
            ? 'border-primary/20 shadow-primary/5' 
            : 'border-emerald-500/20 shadow-emerald-500/5'
        }`}>
          {pricingMode === 'fixed' ? (
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
          ) : (
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-10 -mt-10"></div>
          )}

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
               <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 h-auto p-1.5 bg-muted/30 rounded-full border border-border/50">
                <TabsTrigger value="fixed" className="flex items-center justify-center gap-2.5 py-2.5 rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300">
                  <Tags className="h-4 w-4" />
                  <span className="font-semibold">Option 1: Fixed Pricing</span>
                </TabsTrigger>
                <TabsTrigger value="income" className="flex items-center justify-center gap-2.5 py-2.5 rounded-full data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-md transition-all duration-300">
                  <HeartHandshake className="h-4 w-4" />
                  <span className="font-semibold">Option 2: Income-Based</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Fixed Pricing Tab */}
            <TabsContent value="fixed" className="mt-0 animate-in fade-in-50 duration-500 slide-in-from-bottom-2">
               <div className="text-center mb-10">
                  <Badge variant="secondary" className="mb-3 px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-100">Most Popular Choice</Badge>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Simple, predictable monthly fees for families who prefer a standard tuition structure.
                  </p>
               </div>

              <div className="grid md:grid-cols-3 gap-6">
                {PLANS.map((plan) => (
                  <Card key={plan.key} className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${plan.popular ? 'border-primary shadow-md' : 'border-border'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className={`${plan.popular ? 'bg-primary/5' : ''} pb-2`}>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-normal">
                          {plan.classesPerWeek} classes/week
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{plan.durationMinutes}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="text-3xl font-bold tracking-tight">
                              {convert(plan.fixedRange[0], BASE_CURRENCY, currency)}
                            </span>
                            <span className="text-muted-foreground font-medium"> – </span>
                            <span className="text-3xl font-bold tracking-tight">
                              {convert(plan.fixedRange[1], BASE_CURRENCY, currency)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            {currency} / month
                          </p>
                        </div>

                        <Button asChild className={`w-full ${plan.popular ? '' : 'variant-outline'}`}>
                          <Link href="/enroll">
                            Get Free Trial
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
            <TabsContent value="income" className="mt-0 animate-in fade-in-50 duration-500 slide-in-from-bottom-2">
               <div className="text-center mb-10">
                  <Badge variant="secondary" className="mb-3 px-3 py-1 text-sm bg-emerald-50 text-emerald-700 border-emerald-100">Fairness Guarantee</Badge>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Pay a small percentage of your income. We believe financial constraints should never be a barrier to Qur'an education.
                  </p>
               </div>

              {/* Income-Based Plans */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {PLANS.map((plan) => (
                  <Card key={plan.key} className="relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-emerald-100 dark:border-emerald-900/20">
                    <CardHeader className="bg-emerald-50/30 dark:bg-emerald-900/10 pb-2">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-normal">
                          {plan.classesPerWeek} classes/week
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{plan.durationMinutes}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                          <div className="mb-1">
                            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                              {(plan.incomePercentage * 100).toFixed(1)}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">
                             of monthly family income
                          </p>
                        </div>
                        
                         <div className="text-xs text-center text-muted-foreground bg-muted/30 py-1 rounded">
                            Min: {plan.key === 'base' ? '2%' : plan.key === 'intermediate' ? '2.5%' : '3%'}
                          </div>

                        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Link href="/enroll">
                            Get Free Trial
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Nothing */}
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-emerald-50/50 border-emerald-100">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                      <HeartHandshake className="h-5 w-5" />
                      Why choose Income-Based?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                        <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                        <span>Pay strictly according to what you earn</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                        <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                        <span>Reduces financial pressure on families</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                         <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                        <span>Promotes equal access to quality education</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* How It Works Section */}
                <Card className="border-emerald-100">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-base">How it works</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                        <p className="text-sm">Select a plan & enter family income</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                         <p className="text-sm">Fee is calculated automatically</p>
                      </div>
                      
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                        <span className="font-semibold">Example:</span> Income {currency} 1,000 + Base Plan (2%) = {convert(calculateIncomeBasedFee(1000, 0.02), BASE_CURRENCY, currency)} {currency} fee.
                      </div>

                      <div className="flex gap-2 pt-2">
                         <Button asChild size="sm" variant="outline" className="w-full text-xs h-8">
                          <Link href="/enroll">Calculate Fee</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Quality Assurance Section */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
            <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Same Quality Guarantee</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Regardless of the price plan, every student receives the same high standard of education.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: GraduationCap, title: "Expert Teachers", text: "Same experienced & qualified teachers for all students" },
            { icon: Video, title: "Live Classes", text: "Same interactive one-on-one sessions via video call" },
            { icon: BookOpen, title: "Tajweed Focus", text: "Same rigorous focus on correct pronunciation & rules" },
            { icon: Headphones, title: "Student Support", text: "Same dedicated 24/7 support for parents & students" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl mb-5 text-blue-600 dark:text-blue-400">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
           <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/10 px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-900/20">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Only the fee calculation changes — not the learning experience.</span>
           </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-24 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <HelpCircle className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our pricing and policies
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="compulsory" className="bg-white dark:bg-card border border-border/50 rounded-xl px-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:ring-2 data-[state=open]:ring-primary/20">
            <AccordionTrigger className="px-4 py-5 hover:no-underline">
              <span className="text-base font-semibold text-left text-foreground/90">Is Income-Based Pricing compulsory?</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
              No. You may choose Fixed Pricing if you prefer. We offer both options to ensure every family can find a plan that works for them.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="proof" className="bg-white dark:bg-card border border-border/50 rounded-xl px-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:ring-2 data-[state=open]:ring-primary/20">
            <AccordionTrigger className="px-4 py-5 hover:no-underline">
              <span className="text-base font-semibold text-left text-foreground/90">Do I need to show income proof?</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
              No. We rely on honesty and transparency (Amanah). We trust our community to choose the plan that truthfully reflects their financial situation.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="change" className="bg-white dark:bg-card border border-border/50 rounded-xl px-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:ring-2 data-[state=open]:ring-primary/20">
            <AccordionTrigger className="px-4 py-5 hover:no-underline">
              <span className="text-base font-semibold text-left text-foreground/90">Can I change my plan later?</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
              Yes. Simply contact our support team, and we will adjust your plan for the upcoming month. There are no penalties for switching plans.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contract" className="bg-white dark:bg-card border border-border/50 rounded-xl px-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:ring-2 data-[state=open]:ring-primary/20">
            <AccordionTrigger className="px-4 py-5 hover:no-underline">
              <span className="text-base font-semibold text-left text-foreground/90">Is there a long-term contract?</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
              No. All plans are month-to-month. You can cancel anytime without any cancellation fees.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="siblings" className="bg-white dark:bg-card border border-border/50 rounded-xl px-2 shadow-sm transition-all duration-200 hover:shadow-md data-[state=open]:ring-2 data-[state=open]:ring-primary/20">
            <AccordionTrigger className="px-4 py-5 hover:no-underline">
              <span className="text-base font-semibold text-left text-foreground/90">Can I enroll multiple children?</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-0 text-muted-foreground text-base leading-relaxed">
              Yes! You can easily manage multiple students under one parent account. Each child can even be on a different schedule or plan if needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Free Trial & Promise Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        {/* Start with Free Trial */}
        <div className="bg-gradient-to-br from-primary/5 to-blue-50/50 dark:to-primary/10 rounded-2xl border border-primary/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
          
          <div className="p-8 h-full flex flex-col items-center text-center">
            <div className="bg-white dark:bg-card p-3 rounded-full shadow-sm mb-6 relative z-10">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Start Free Trial</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Begin your journey with a complimentary class.
            </p>
            
            <div className="space-y-3 mb-8 w-full max-w-xs text-left">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                  <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium">No payment required</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                  <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium">Meet your teacher</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                  <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium">Experience the method</span>
              </div>
            </div>
            
            <div className="mt-auto w-full space-y-3">
              <Button asChild className="w-full shadow-lg shadow-primary/20" size="lg">
                <Link href="/enroll?type=trial">
                  Get Free Trial Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-white/50 dark:bg-card/50" size="lg">
                <Link href="/enroll">
                  Get Registered
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50/30 dark:from-emerald-950/20 dark:to-green-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20"></div>
          
          <div className="p-8 h-full flex flex-col items-center text-center justify-center">
             <div className="bg-white dark:bg-card p-3 rounded-full shadow-sm mb-6 border border-emerald-50 dark:border-emerald-900/30">
              <HeartHandshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Our Promise</h2>
            
            <div className="bg-white/60 dark:bg-card/60 p-6 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 shadow-sm">
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                "Our pricing model is built on <span className="text-emerald-700 dark:text-emerald-400">fairness</span>, <span className="text-emerald-700 dark:text-emerald-400">transparency</span>, and <span className="text-emerald-700 dark:text-emerald-400">care</span> — so every student can learn the Qur'an with confidence and dignity."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
