'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { 
  Target, 
  Users, 
  Award, 
  Wallet, 
  BookOpen, 
  Mic, 
  Heart, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Header Section */}
      <section className="container pt-6 pb-2 md:pt-10 md:pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t.about.title}</h1>
      </section>

      {/* Mission & Who We Are Section */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-primary/5 border-none shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">{t.about.mission.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.about.mission.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-none shadow-sm h-full">
             <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-foreground" />
                <CardTitle className="text-2xl">{t.about.whoWeAre.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.about.whoWeAre.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="container mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">{t.about.setsApart.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Award className="w-6 h-6 text-primary" />}
            title={t.about.setsApart.expertTeachers.title}
            description={t.about.setsApart.expertTeachers.description}
          />
          <FeatureCard 
            icon={<Wallet className="w-6 h-6 text-primary" />}
            title={t.about.setsApart.flexiblePricing.title}
            description={t.about.setsApart.flexiblePricing.description}
          />
          <FeatureCard 
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            title={t.about.setsApart.structuredCourses.title}
            description={t.about.setsApart.structuredCourses.description}
          />
          <FeatureCard 
            icon={<Mic className="w-6 h-6 text-primary" />}
            title={t.about.setsApart.focusOnTajweed.title}
            description={t.about.setsApart.focusOnTajweed.description}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 mb-16 rounded-3xl mx-4 lg:mx-8">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.about.whyChooseUs.title}</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <CheckItem 
              title={t.about.whyChooseUs.experiencedTeachers.title}
              description={t.about.whyChooseUs.experiencedTeachers.description}
            />
            <CheckItem 
              title={t.about.whyChooseUs.affordablePricing.title}
              description={t.about.whyChooseUs.affordablePricing.description}
            />
            <CheckItem 
              title={t.about.whyChooseUs.personalizedLearning.title}
              description={t.about.whyChooseUs.personalizedLearning.description}
            />
             <CheckItem 
              title={t.about.whyChooseUs.correctRecitation.title}
              description={t.about.whyChooseUs.correctRecitation.description}
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">{t.about.values.title}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted bg-card">
             <CardHeader className="space-y-4 pb-2">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                 <ShieldCheck className="w-8 h-8 text-primary" />
               </div>
               <CardTitle className="text-xl font-semibold">{t.about.values.transparency.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">{t.about.values.transparency.description}</p>
             </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted bg-card">
             <CardHeader className="space-y-4 pb-2">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                 <Heart className="w-8 h-8 text-primary" />
               </div>
               <CardTitle className="text-xl font-semibold">{t.about.values.supportive.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">{t.about.values.supportive.description}</p>
             </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted bg-card">
             <CardHeader className="space-y-4 pb-2">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                 <Globe className="w-8 h-8 text-primary" />
               </div>
               <CardTitle className="text-xl font-semibold">{t.about.values.inclusive.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">{t.about.values.inclusive.description}</p>
             </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mb-24">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 rounded-3xl p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">{t.about.cta.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.about.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="font-bold text-lg px-8 h-14 shadow-md hover:shadow-lg transition-all">
                <Link href="/enroll?type=trial">{t.about.cta.getFreeTrial}</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8 h-14 border-primary/20 hover:bg-primary/5" asChild>
                <Link href="/courses">{t.about.cta.learnMore}</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function CheckItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
        <ShieldCheck className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
