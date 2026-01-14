'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  CheckCircle,
  Gift,
  UserCheck,
  UsersIcon
} from 'lucide-react';
import { COURSES } from '@/lib/config';
import { Award, Globe, Heart, BookOpen } from 'lucide-react';


export default function CoursesPage() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Structured Islamic education programs with individual and group options.
          All courses include a free 3-day trial period.
        </p>
      </div>

      {/* Free Trial Banner */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="inline-flex items-center gap-3">
              <Gift className="w-7 h-7 text-green-600" />
              <h2 className="text-xl font-bold text-green-800">Free 3-Day Trial for All Courses!</h2>
            </div>
            <p className="text-green-700">Experience our teaching methodology with no payment required</p>
          </div>
        </CardContent>
      </Card>

      {/* Featured Courses (concise cards) */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Qur'an Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <Card key={course.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {course.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                    <Badge variant={course.badge === 'Children Only' ? "default" : "secondary"} className="text-xs">
                      {course.badge}
                    </Badge>
                  </div>
                  {course.icon ? (
                    <course.icon className="w-5 h-5 text-primary" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-primary" />
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(course.topics ?? []).slice(0, 3).map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <Button size="sm" asChild>
                      <Link href={`/enroll?course=${course.id}`}>
                        <Gift className="w-4 h-4 mr-2" />
                        Enroll / Free Trial
                      </Link>
                    </Button>
                    {/* <Button size="sm" variant="outline" asChild>
                      <a href="/teachers">Meet Tutors</a>
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Features of Our Quran Courses */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Key Features of Our Qur'an Courses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Expert Tutors</p>
                <p className="text-sm text-muted-foreground">Qualified, experienced instructors</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Flexible Learning</p>
                <p className="text-sm text-muted-foreground">Urdu and English modes</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Interactive & Engaging</p>
                <p className="text-sm text-muted-foreground">Motivating, student-centered methods</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Comprehensive Curriculum</p>
                <p className="text-sm text-muted-foreground">Reading, Tajweed, Hifz, Duas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
              <UserCheck className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Progress Tracking</p>
                <p className="text-sm text-muted-foreground">Assessments and feedback</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Islamic Learning Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of students learning with our certified instructors.
            Start with our free 3-day trial - no payment required!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              <Gift className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
