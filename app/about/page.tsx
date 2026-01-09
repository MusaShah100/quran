'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { 
  BookOpen, 
  Users, 
  Target, 
  Award,
  Globe,
  Heart,
  CheckCircle,
  Calendar
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.about.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.about.description}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle>{t.about.mission.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.mission.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <CardTitle>{t.about.vision.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.vision.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What Makes Us Different */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t.about.different.title}</CardTitle>
          <CardDescription className="text-center">
            {t.about.different.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t.about.different.interactive.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.different.interactive.description}
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t.about.different.certified.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.different.certified.description}
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t.about.different.family.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.different.family.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">{t.about.journey.title}</CardTitle>
          <CardDescription>{t.about.journey.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                year: '2020',
                title: 'Foundation',
                description: 'QuranLearn was founded with the vision of making Qur\'an education accessible worldwide'
              },
              {
                year: '2021',
                title: 'Platform Launch',
                description: 'Launched our interactive Qur\'an reader with word-by-word highlighting and Tajwīd colors'
              },
              {
                year: '2022',
                title: 'Educational Games',
                description: 'Introduced interactive learning games to make Qur\'an education engaging for all ages'
              },
              {
                year: '2023',
                title: 'Live Classes',
                description: 'Started offering live online classes with certified teachers and personalized instruction'
              },
              {
                year: '2024',
                title: 'Global Community',
                description: 'Reached 50,000+ active learners across 75+ countries with multilingual support'
              }
            ].map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < 4 && <div className="w-0.5 h-8 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Values */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t.about.values.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: t.about.values.authenticity.title,
                description: t.about.values.authenticity.description
              },
              {
                icon: Globe,
                title: t.about.values.accessibility.title,
                description: t.about.values.accessibility.description
              },
              {
                icon: Users,
                title: t.about.values.community.title,
                description: t.about.values.community.description
              },
              {
                icon: Award,
                title: t.about.values.excellence.title,
                description: t.about.values.excellence.description
              }
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Preview */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">{t.about.team.title}</CardTitle>
          <CardDescription>
            {t.about.team.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                name: 'Dr. Ahmed Al-Mahmoud',
                role: 'Lead Islamic Scholar',
                specialization: 'Qur\'anic Studies & Tajwīd',
                credentials: 'PhD Islamic Studies, Al-Azhar University'
              },
              {
                name: 'Sister Fatima Rahman',
                role: 'Head of Curriculum',
                specialization: 'Islamic Education & Child Development',
                credentials: 'MA Islamic Education, IIIT'
              },
              {
                name: 'Brother Yusuf Chen',
                role: 'Technology Director',
                specialization: 'Educational Technology',
                credentials: 'MS Computer Science, MIT'
              }
            ].map((member) => (
              <Card key={member.name}>
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-1">{member.specialization}</p>
                  <p className="text-xs text-muted-foreground">{member.credentials}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild>
              <Link href="/teachers">
                {t.about.team.viewAll}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accreditation */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t.about.accreditation.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">{t.about.accreditation.scholarlyReview.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.accreditation.scholarlyReview.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{t.about.accreditation.educationalStandards.title}</h3>
              <p className="text-sm text-muted-foreground">
                {t.about.accreditation.educationalStandards.description}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">COPPA Compliant</Badge>
            <Badge variant="outline">GDPR Compliant</Badge>
            <Badge variant="outline">ISO 27001 Security</Badge>
            <Badge variant="outline">Accessibility AA</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t.about.ready.title}</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t.about.ready.description}
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/quran">{t.about.ready.startReading}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">{t.about.ready.getInTouch}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}