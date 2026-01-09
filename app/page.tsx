'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/language-context';
import { 
  BookOpen, 
  Users, 
  Gamepad2, 
  Headphones,
  Palette,
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Award,
  Clock,
  Shield,
  Zap,
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  {t.home.hero.badge}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t.home.hero.title}{' '}
                  <span className="text-primary">{t.home.hero.titleHighlight}</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t.home.hero.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/quran">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t.home.hero.startTrial}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="/courses">
                    <Users className="mr-2 h-4 w-4" />
                    {t.home.hero.viewCourses}
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background"></div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">500+ {t.home.hero.happyStudents}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-sm text-muted-foreground">(200+ {t.home.hero.reviews})</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BookOpen className="w-32 h-32 text-primary animate-pulse" />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center animate-bounce">
                  <Headphones className="w-8 h-8 text-secondary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center animate-pulse">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">{t.home.trust.activeStudents}</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">{t.home.trust.expertTeachers}</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">{t.home.trust.studentRating}</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">{t.home.trust.support}</div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-4">{t.home.howItWorks.badge}</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.home.howItWorks.title}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t.home.howItWorks.description}
              </p>
            </div>
          </div>
          
          {/* Modern Step-by-Step Design */}
          <div className="mx-auto max-w-6xl py-12">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 hidden lg:block"></div>
              
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
                {[
                  {
                    step: "01",
                    icon: BookOpen,
                    title: t.home.howItWorks.step1.title,
                    description: t.home.howItWorks.step1.description,
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    step: "02", 
                    icon: Users,
                    title: t.home.howItWorks.step2.title,
                    description: t.home.howItWorks.step2.description,
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    step: "03",
                    icon: Award,
                    title: t.home.howItWorks.step3.title, 
                    description: t.home.howItWorks.step3.description,
                    color: "from-green-500 to-green-600"
                  }
                ].map((step, index) => (
                  <div key={step.step} className="relative group">
                    {/* Step Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-8">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {step.step}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="mt-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} bg-opacity-10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center space-y-3">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-b-2xl"></div>
                    </div>
                    
                    {/* Connection Dots for Mobile */}
                    {index < 2 && (
                      <div className="lg:hidden flex justify-center my-6">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-primary/60 rounded-full mx-2"></div>
                        <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8">
            <Button asChild size="lg">
              <Link href="/courses">
                {t.home.howItWorks.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-muted/40 to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-4">{t.home.features.badge}</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.home.features.title}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t.home.features.description}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            {[
              {
                icon: BookOpen,
                title: t.home.features.interactiveReader.title,
                description: t.home.features.interactiveReader.description
              },
              {
                icon: Users,
                title: t.home.features.certifiedTeachers.title,
                description: t.home.features.certifiedTeachers.description
              },
              {
                icon: Clock,
                title: t.home.features.flexibleScheduling.title,
                description: t.home.features.flexibleScheduling.description
              },
              {
                icon: Headphones,
                title: t.home.features.audioIntegration.title,
                description: t.home.features.audioIntegration.description
              },
              {
                icon: Shield,
                title: t.home.features.progressTracking.title,
                description: t.home.features.progressTracking.description
              },
              {
                icon: Heart,
                title: t.home.features.communitySupport.title,
                description: t.home.features.communitySupport.description
              }
            ].map((feature) => (
              <Card key={feature.title} className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-4">{t.home.courses.badge}</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.home.courses.title}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t.home.courses.description}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            {[
              {
                title: t.home.courses.tajweed.title,
                description: t.home.courses.tajweed.description,
                ages: t.home.courses.tajweed.ages,
                price: t.home.courses.tajweed.price,
                icon: BookOpen
              },
              {
                title: t.home.courses.hifz.title,
                description: t.home.courses.hifz.description,
                ages: t.home.courses.hifz.ages,
                price: t.home.courses.hifz.price,
                icon: Award
              },
              {
                title: t.home.courses.tafseer.title,
                description: t.home.courses.tafseer.description,
                ages: t.home.courses.tafseer.ages,
                price: t.home.courses.tafseer.price,
                icon: Globe
              }
            ].map((course) => (
              <Card key={course.title} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <course.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-muted-foreground">{course.ages}</div>
                    <div className="text-lg font-semibold text-primary">{course.price}</div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/courses">
                      {t.home.courses.startTrial}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-4">{t.home.testimonials.badge}</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.home.testimonials.title}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t.home.testimonials.description}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Mother of 8-year-old student",
                content: "My daughter's Tajweed improved dramatically in just 3 months. The teachers are so patient and caring!",
                rating: 5
              },
              {
                name: "Ahmed K.",
                role: "Adult Student",
                content: "Starting Qur'an learning at 35 felt daunting, but the structured approach made it achievable. Alhamdulillah!",
                rating: 5
              },
              {
                name: "Fatima A.",
                role: "Hifz Student",
                content: "Completed my Hifz journey with amazing teachers. The memorization techniques really work!",
                rating: 5
              }
            ].map((testimonial) => (
              <Card key={testimonial.name} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3 italic">"{testimonial.content}"</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t.home.cta.badge}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.home.cta.title}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {t.home.cta.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/courses">
                  <Zap className="mr-2 h-5 w-5" />
                  {t.home.cta.startTrial}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/teachers">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t.home.cta.talkToTeacher}
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.home.cta.noCreditCard}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.home.cta.cancelAnytime}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{t.home.cta.support247}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{t.home.contactCta.title}</h3>
              <p className="text-muted-foreground">
                {t.home.contactCta.description}
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  {t.home.contactCta.whatsapp}
                </a>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t.home.contactCta.contactUs}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}