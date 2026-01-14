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
  UserCheck,
  BookMarked,
  Building2,
  TrendingUp,
  Handshake,
  Target,
  Lightbulb
} from 'lucide-react';
import { COURSES } from '@/lib/config';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)] pointer-events-none" />
        <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-5">
            <Badge variant="secondary" className="text-sm px-3 py-1">🎁 Free Trial Class Available</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Learn the Qur’an Correctly with Expert Teachers
            </h1>
            <p className="text-muted-foreground text-lg">
              Structured Qur’an learning with certified teachers, personalized guidance, and a strong focus on correct Tajweed for children and adults.
              We offer affordable learning options, including income-based pricing, to ensure Qur’anic education remains accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-6">
                <Link href="/enroll">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Free Trial Class
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-6">
                <Link href="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Courses
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-6 border flex flex-col gap-5">
            {[
              { icon: Heart, title: 'Accessible Pricing', subtitle: 'Fixed & Income-Based Options' },
              { icon: Shield, title: 'Focus on Tajweed', subtitle: 'Correct Pronunciation & Recitation' },
              { icon: Users, title: 'Guided Support', subtitle: 'Personalized feedback in every class' }
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
      </section>

      {/* Values & Trust */}
      <section className="py-12 bg-gradient-to-br from-muted/40 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Founded on Teaching Experience</h2>
            <p className="text-muted-foreground">
              We prioritize correct recitation, patience, and support for all ages.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Founded on Teaching Experience', desc: 'Teachers with real online classroom exposure and years of prior teaching.', icon: Award },
              { title: 'Focused on Correct Recitation', desc: 'Tajweed taught with care, precision, and proper pronunciation.', icon: BookOpen },
              { title: 'Learning for All Ages', desc: 'Children, beginners, and adults are all welcome.', icon: Users },
              { title: 'Student-First Approach', desc: 'Personal guidance, patience, and continuous support in every class.', icon: Heart },
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
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Start Your Online Qur’an Learning in 3 Simple Steps</h2>
            <p className="text-muted-foreground">
              Begin your Qur’an learning journey with a structured, guided, and student-friendly approach.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Your Course',
                desc: 'Select from Qur’an Reading (Beginner Tajweed), Advanced Tajweed, Children’s Qur’an Learning, or Islamic Duas & Supplications based on your level and goals.',
                icon: BookOpen
              },
              {
                step: '02',
                title: 'Meet Your Teacher',
                desc: 'Get registered or book a free trial class by filling out a form. Our team will contact you to understand your learning needs and arrange your free trial class.',
                icon: Users
              },
              {
                step: '03',
                title: 'Learn, Practice & Improve',
                desc: 'Attend live classes, practice regularly, and receive continuous feedback to improve your recitation step by step.',
                icon: CheckCircle2
              },
            ].map((item) => (
              <Card key={item.step} className="h-full">
                <CardHeader>
                  <Badge variant="outline" className="mb-2">{item.step}</Badge>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
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

      {/* Features */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Everything You Need to Learn Effectively</h2>
            <p className="text-muted-foreground">Guidance and support designed for meaningful Qur’an learning.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Live Teacher Recitation', desc: 'Correct your pronunciation through direct recitation and feedback during live classes.' },
              { title: 'Certified Teachers', desc: 'Learn from qualified Qur’an teachers with real online teaching experience and a focus on correct Tajweed.' },
              { title: 'Flexible Scheduling', desc: 'Class timings are arranged according to student availability across different time zones.' },
              { title: 'Guided Progress', desc: 'Improve steadily through teacher feedback and structured lessons.' },
              { title: 'Supportive Learning Environment', desc: 'Receive continuous assistance and guidance from our team throughout your learning journey.' },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
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

      {/* Courses */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Choose Your Learning Path</h2>
            <p className="text-muted-foreground">Structured courses designed for different age groups and learning needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.filter(c => ['quran-reading', 'tajweed', 'kids', 'duas'].includes(c.id)).map((item) => (
              <Card key={item.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <CardDescription>{item.summary}</CardDescription>
                  <Button asChild variant="outline">
                    <Link href="/courses">See Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Institute Is New — Our Teachers Are Experienced</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our online Qur’an learning institute is newly established, but our teachers bring years of real online teaching experience. Before coming together as one institute, our instructors were already teaching Qur’an, Tajweed, and basic recitation to students across the world. By uniting as an institute, we now offer a more structured, supportive, and accessible Qur’an learning experience for children, adults, and families.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-muted/20 to-secondary/10">
        <div className="container px-4 md:px-6 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">What Our Early Learners Say</h2>
            <p className="text-muted-foreground">
              We are grateful to begin our journey with a small group of dedicated learners. Feedback shared by early learners during our initial phase.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Parent of a Child Student', quote: '“The teacher is professional and explains Tajweed gently. My child enjoys the classes and is improving day by day, Alhamdulillah.”' },
              { name: 'Adult Beginner', quote: '“I was nervous to start Qur’an learning, but the teacher made it comfortable and structured. I feel encouraged to continue.”' },
              { name: 'Parent', quote: '“We appreciate the respectful teaching style. The institute feels sincere and focused on learning.”' },
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
            You may also visit our social media pages to view additional testimonials.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container px-4 md:px-6 space-y-10 max-w-5xl mx-auto">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <HelpCircle className="h-4 w-4" />
              Get Answers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about our courses, pricing, and learning process.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: 'How does the free trial class work?',
                a: 'After you register, our team contacts you to schedule a free trial class with a suitable teacher. No payment is required for the trial.',
                icon: Sparkles,
                color: 'text-yellow-600'
              },
              {
                q: 'What pricing options do you offer?',
                a: 'We offer Fixed Pricing plans as well as Income-Based Pricing, where fees are calculated as a percentage of monthly family income.',
                icon: DollarSign,
                color: 'text-green-600'
              },
              { q: 'What is Income-Based Pricing?', a: 'It allows families to pay according to what they earn. Lower income means lower fees, ensuring equal access to Qur’anic education.' },
              {
                q: 'Are classes live or recorded?',
                a: 'All classes are live with teachers. Students learn through direct recitation, listening, and feedback.',
                icon: Video,
                color: 'text-purple-600'
              },
              {
                q: 'Who can join these courses?',
                a: 'Children, beginners, adults, and families are all welcome. Courses are adjusted according to age and learning level.',
                icon: Users,
                color: 'text-pink-600'
              },
              {
                q: 'Do I need prior knowledge to start?',
                a: 'No. Beginners are fully supported, starting from Arabic letters and basic pronunciation.',
                icon: BookMarked,
                color: 'text-orange-600'
              },
            ].map((item, idx) => (
              <AccordionItem
                value={`item-${idx}`}
                key={item.q}
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
          <h2 className="text-3xl font-bold">Start Your Free Trial Class Today</h2>
          <p className="text-muted-foreground text-lg">
            Experience Qur’an learning with experienced teachers, structured lessons, and personalized guidance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> No Credit Card Required
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> Cancel Anytime
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> Guided Support Throughout
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/enroll">
                Start Free Trial Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container px-4 md:px-6 flex flex-col gap-7 text-center">

          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            About
          </h3>

          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            An online Qur’an learning institute dedicated to correct Tajweed,
            guided teaching, and accessible education for children and adults
            around the world.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">Focus on Tajweed</span>
            </div>

            <div className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Guided Support</span>
            </div>

            <div className="flex items-center gap-2 text-base px-4 py-2 rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="font-medium">Accessible Pricing</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center text-base font-medium">
            <Link href="/courses" className="text-primary hover:underline">
              Courses
            </Link>
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>

          <div className="flex flex-wrap gap-5 justify-center text-base text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-5 w-5" /> Email
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-5 w-5" /> WhatsApp
            </span>
            <span>Get in Touch</span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground">
            🌍 Online Qur’an learning for children, beginners, and families worldwide.
          </p>

        </div>
      </section>

    </div>
  );
}
