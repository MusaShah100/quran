'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/language-context';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { COURSES } from '@/lib/config';

import {
  Menu,
  BookOpen,
  Home,
  Users,
  MessageCircle,
  Play,
  Gamepad2,
  GraduationCap,
  Bell,
  Settings,
  DollarSign,
  Info,
  ChevronDown
} from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    { name: t.nav.home, href: '/', icon: Home },
    { name: t.nav.quran, href: '/quran', icon: BookOpen },
    { name: t.nav.games, href: '/games', icon: Gamepad2 },
    { name: t.nav.courses, href: '/courses', icon: GraduationCap },
    // { name: t.nav.videos, href: '/videos', icon: Play },
    // { name: t.nav.teachers, href: '/teachers', icon: Users },
    { name: t.nav.pricing, href: '/pricing', icon: DollarSign },
    { name: t.nav.about, href: '/about', icon: Info },
    { name: t.nav.contact, href: '/contact', icon: MessageCircle },
    { name: t.nav.admin, href: '/admin', icon: Settings },
    { name: t.nav.teacherDashboard, href: '/teacher-dashboard', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">QuranLearn</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.slice(0, 7).map((item) => {
            if (item.href === '/courses') {
              return (
                <HoverCard key={item.href}>
                  <HoverCardTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <span className="inline-flex items-center gap-1">
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[28rem]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {COURSES.slice(0, 4).map((c) => (
                        <Link key={c.id} href="/courses" className="rounded-md p-2 hover:bg-muted/40">
                          <div className="text-sm font-medium">{c.title}</div>
                          <div className="text-xs text-muted-foreground">{c.summary}</div>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-3">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/courses">View All Courses</Link>
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/enroll">{t.nav.getFreeTrial}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/enroll">{t.nav.getRegistered}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t.common.toggleMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg">QuranLearn</span>
                </Link>

                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-primary hover:bg-accent"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}

                  {/* CTA Buttons for Mobile */}
                  <div className="flex flex-col gap-2 pt-2 border-t mt-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/enroll" onClick={() => setIsOpen(false)}>
                        {t.nav.getFreeTrial}
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/enroll" onClick={() => setIsOpen(false)}>
                        {t.nav.getRegistered}
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
