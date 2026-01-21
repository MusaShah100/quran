'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Phone,
  Heart,
  Award,
  Shield,
  Clock,
  Globe,
  Star,
  Quote,
  HelpCircle,
  DollarSign,
  GraduationCap,
  Video,
  BookMarked,
  Building2,
  Coins,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { COURSES } from '@/lib/config';
import { useLanguage } from '@/contexts/language-context';

export default function HomePage() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1920', // Quran (Malik Shibly)
    'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=1920', // Person reading Quran (Masjid MABA)
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1920', // Quran (Abdullah Arif)
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-14 md:py-18 lg:py-20 overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={img}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
              {/* Overlay for text readability - Gradient to show images while keeping text readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
            </div>
          ))}
        </div>

        {/* Original Gradient Overlay - Adjusted for transparency */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)] pointer-events-none z-0" />

        <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-5">
            <Badge variant="secondary" className="text-sm px-3 py-1">{t.home.hero.badge}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t.home.hero.title} <span className="text-primary">{t.home.hero.titleHighlight}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-xl animate-pulse" />
                <Button
                  asChild
                  size="lg"
                  className="relative text-lg px-6 bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Link href="/enroll?type=trial">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t.home.hero.startTrial}
                  </Link>
                </Button>
              </div>
              <Button asChild variant="outline" size="lg" className="text-lg px-6">
                <Link href="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t.home.hero.viewCourses}
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative" style={{ animation: 'floatHero 8s ease-in-out infinite' }}>
            <div className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-10 w-36 h-36 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />
            <Sparkles className="absolute -top-6 right-10 h-6 w-6 text-primary/60 animate-bounce pointer-events-none" />
            <Star className="absolute bottom-6 -left-6 h-6 w-6 text-secondary/60 animate-pulse pointer-events-none" />
            <Globe className="absolute top-24 -right-10 h-6 w-6 text-accent/60 animate-spin pointer-events-none" />
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-6 border flex flex-col gap-5 transition-transform duration-300 ease-out md:-translate-y-1 hover:-translate-y-2">
              {[
                { icon: Heart, title: t.home.hero.floatingCard.accessible.title, subtitle: t.home.hero.floatingCard.accessible.subtitle },
                { icon: Shield, title: t.home.hero.floatingCard.tajweed.title, subtitle: t.home.hero.floatingCard.tajweed.subtitle },
                { icon: Users, title: t.home.hero.floatingCard.support.title, subtitle: t.home.hero.floatingCard.support.subtitle }
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="font-semibold">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes floatHero {
            0%, 100% { transform: translateY(-4px); }
            50% { transform: translateY(4px); }
          }
        `}</style>
      </section>

      {/* Values & Trust */}
      <section className="py-12 bg-gradient-to-br from-muted/40 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">{t.home.values.items.experience.title}</h2>
            <p className="text-muted-foreground">
              {t.home.values.items.recitation.desc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.home.values.items.experience.title, desc: t.home.values.items.experience.desc, icon: Award },
              { title: t.home.values.items.recitation.title, desc: t.home.values.items.recitation.desc, icon: BookOpen },
              { title: t.home.values.items.allAges.title, desc: t.home.values.items.allAges.desc, icon: Users },
              { title: t.home.values.items.studentFirst.title, desc: t.home.values.items.studentFirst.desc, icon: Heart },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_right,_rgba(147,197,253,0.15),_transparent)] pointer-events-none" />
        <div className="container px-4 md:px-6 space-y-12 relative z-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">{t.home.howItWorks.title}</h2>
            <p className="text-muted-foreground">
              {t.home.howItWorks.description}
            </p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 hidden lg:block bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="grid lg:grid-cols-3 gap-7">
              {[
                {
                  step: 1,
                  title: t.home.howItWorks.steps.step1.title,
                  desc: t.home.howItWorks.steps.step1.desc,
                  icon: BookOpen
                },
                {
                  step: 2,
                  title: t.home.howItWorks.steps.step2.title,
                  desc: t.home.howItWorks.steps.step2.desc,
                  icon: Users
                },
                {
                  step: 3,
                  title: t.home.howItWorks.steps.step3.title,
                  desc: t.home.howItWorks.steps.step3.desc,
                  icon: CheckCircle2
                },
              ].map((item) => (
                <Card
                  key={item.step}
                  className="h-full relative overflow-hidden rounded-2xl border-2 border-primary/10 bg-white/90 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />
                  <CardHeader className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="inline-flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {item.step}
                        </div>
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          Step
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">{t.home.features.title}</h2>
            <p className="text-muted-foreground">{t.home.features.description}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.home.features.items.liveRecitation.title, desc: t.home.features.items.liveRecitation.desc, icon: Sparkles },
              { title: t.home.features.items.certifiedTeachers.title, desc: t.home.features.items.certifiedTeachers.desc, icon: Award },
              { title: t.home.features.items.flexibleScheduling.title, desc: t.home.features.items.flexibleScheduling.desc, icon: Clock },
              { title: t.home.features.items.guidedProgress.title, desc: t.home.features.items.guidedProgress.desc, icon: CheckCircle2 },
              { title: t.home.features.items.supportiveEnvironment.title, desc: t.home.features.items.supportiveEnvironment.desc, icon: Heart },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/5 via-muted/20 to-secondary/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-32 -right-10 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
          <div className="absolute inset-y-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />
        </div>
        <div className="container relative px-4 md:px-6 space-y-10">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              {t.home.popularCourses.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{t.home.popularCourses.title}</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t.home.popularCourses.description}
            </p>
          </div>
          <div className="relative group px-4 md:px-12">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background hover:text-primary"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background hover:text-primary"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {COURSES.map((item) => (
              <div key={item.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-center">
                <Card
                  className="h-full flex flex-col border-primary/10 bg-white/80 backdrop-blur-sm shadow-lg shadow-primary/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-primary/10">
                        {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                      </div>
                      <CardTitle className="text-lg leading-snug">
                        {t.coursesList[item.id as keyof typeof t.coursesList]?.title || item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 gap-6 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {(item.topics || []).slice(0, 3).map((topic, idx) =>
                        t.coursesList[item.id as keyof typeof t.coursesList]?.topics?.[idx] || topic
                      ).join(', ')}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="mt-auto w-full justify-center font-semibold shadow-md shadow-primary/30"
                    >
                      <Link href="/courses" className="flex items-center justify-center gap-2">
                        <span>{t.home.popularCourses.viewDetails}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Link href="/courses">
                Show All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-muted/40 via-background to-secondary/15">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-24 left-[-3rem] h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="container relative px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Building2 className="h-4 w-4" />
                {t.home.institute.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {t.home.institute.title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t.home.institute.description}
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-primary/10 p-6 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.home.institute.stats.experience.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.home.institute.stats.experience.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.home.institute.stats.regions.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.home.institute.stats.regions.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.home.institute.stats.structured.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.home.institute.stats.structured.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-muted/20 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">{t.home.testimonials.title}</h2>
            <p className="text-muted-foreground">
              {t.home.testimonials.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: t.home.testimonials.items.parentChild.name, quote: t.home.testimonials.items.parentChild.quote },
              { name: t.home.testimonials.items.adultBeginner.name, quote: t.home.testimonials.items.adultBeginner.quote },
              { name: t.home.testimonials.items.parent.name, quote: t.home.testimonials.items.parent.quote },
            ].map((item) => (
              <Card key={item.name} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Quote className="text-primary h-5 w-5" />
                    </div>
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic">{item.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {t.home.testimonials.footer}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container px-4 md:px-6 space-y-10 max-w-5xl mx-auto">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <HelpCircle className="h-4 w-4" />
              {t.home.faq.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{t.home.faq.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.home.faq.description}
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: t.home.faq.items.trial.q,
                a: t.home.faq.items.trial.a,
                icon: Sparkles,
                color: 'text-yellow-600'
              },
              {
                q: t.home.faq.items.pricing.q,
                a: t.home.faq.items.pricing.a,
                icon: DollarSign,
                color: 'text-green-600'
              },
              {
                q: t.home.faq.items.incomeBased.q,
                a: t.home.faq.items.incomeBased.a,
                icon: Coins,
                color: 'text-amber-600'
              },
              {
                q: t.home.faq.items.liveRecorded.q,
                a: t.home.faq.items.liveRecorded.a,
                icon: Video,
                color: 'text-purple-600'
              },
              {
                q: t.home.faq.items.whoCanJoin.q,
                a: t.home.faq.items.whoCanJoin.a,
                icon: Users,
                color: 'text-pink-600'
              },
              {
                q: t.home.faq.items.priorKnowledge.q,
                a: t.home.faq.items.priorKnowledge.a,
                icon: BookMarked,
                color: 'text-orange-600'
              },
            ].map((item, idx) => (
              <AccordionItem
                value={`item-${idx}`}
                key={idx}
                className="border rounded-lg px-4 bg-white hover:bg-muted/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-2 rounded-lg bg-primary/10 ${item.color} shrink-0`}>
                      {item.icon && <item.icon className="h-5 w-5" />}
                    </div>
                    <span className="font-semibold text-base md:text-lg">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-12">
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/25">
        <div className="container px-4 md:px-6 space-y-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t.home.finalCta.title}</h2>
          <p className="text-muted-foreground text-lg">
            {t.home.finalCta.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> {t.home.finalCta.features.noCreditCard}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> {t.home.finalCta.features.cancelAnytime}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> {t.home.finalCta.features.guidedSupport}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/enroll">
                {t.home.finalCta.startTrial}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                {t.home.finalCta.talkToTeam}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
