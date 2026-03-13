'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const loadCount = useRef(0);
  const thankYouRef = useRef<HTMLDivElement>(null);

  const handleIframeLoad = () => {
    loadCount.current += 1;
    // Assuming the first load is the initial render of the form
    // The second load would be the submission response
    if (loadCount.current > 1) {
      setShowThankYou(true);
      setTimeout(() => {
        thankYouRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };
  
  return (
    <div className="container py-12 max-w-6xl">
      {/* Intro Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Whether you have questions about our courses, pricing, or anything else, feel free to get in touch with us. 
          Our team is ready to provide the information and support you need.
        </p>
      </div>

      {/* Get in Touch Section */}
      <div className="mb-16">

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <Card className="text-center hover:shadow-lg transition-shadow border-primary/10">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  For general inquiries, support, or assistance, send us an email at:
                </p>
                <a href="mailto:quran.info.2025@gmail.com" className="text-primary font-medium hover:underline block">
                  quran.info.2025@gmail.com
                </a>
                <p className="text-xs text-muted-foreground mt-4">
                  We aim to respond to all emails within 24 hours.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-primary/10">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>WhatsApp Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  For quick responses, feel free to message us on WhatsApp at:
                </p>
                <a href="https://wa.link/42vggs" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline block">
                  +92 (111) 123-4567
                </a>
                <p className="text-xs text-muted-foreground mt-4">
                  We’re available to chat during working hours, Monday to Saturday.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-blue-500/10">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  If you prefer to speak directly with someone, call us at:
                </p>
                <a href="tel:+921111234567" className="text-blue-600 font-medium hover:underline block">
                  +92 (111) 123-4567
                </a>
                <p className="text-xs text-muted-foreground mt-4">
                  Our team is ready to assist you with any questions you may have.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="h-full">
            <Card className="overflow-hidden shadow-lg h-full">
              <CardContent className="p-0">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf6DqFQCzYmghum11P1NgwCGP-qSXxVj4Wd7lQzKJYVpvIbcw/viewform?embedded=true"
                  width="100%"
                  height="1000"
                  className="border-0 w-full h-full min-h-[800px] dark:invert dark:hue-rotate-180 transition-all duration-300"
                  title="Contact Form"
                  onLoad={handleIframeLoad}
                >
                  Loading form...
                </iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mb-16 text-center bg-muted/30 py-12 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">Social Media</h2>
        <p className="text-muted-foreground mb-8">
          Follow us on social media for updates, learning tips, and more!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="https://www.facebook.com/share/1C2otKH44A/">
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="https://www.instagram.com/miftahquraninstitute?igsh=dHdlZDhpb3J1ZXZo">
              <Instagram className="h-5 w-5 text-pink-600" />
              Instagram
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="#">
              <Twitter className="h-5 w-5 text-sky-500" />
              Twitter
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="#">
              <Linkedin className="h-5 w-5 text-blue-700" />
              LinkedIn
            </Link>
          </Button>
        </div>
      </div>

      {/* Additional Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* FAQ Section */}
        <div className="bg-primary/5 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">FAQ Section</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions, make sure to check out our Frequently Asked Questions (FAQ) page for immediate answers to common queries.
              </p>
              <Button variant="link" className="p-0 h-auto font-semibold" asChild>
                <Link href="/#faq">Visit FAQ Page &rarr;</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Response Time */}
        <div className="bg-secondary/10 dark:bg-secondary/20 p-8 rounded-2xl border border-transparent dark:border-secondary/30">
          <div className="flex items-start gap-4">
            <div className="bg-secondary/20 dark:bg-secondary/30 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-secondary dark:text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-secondary">Quick Response Time</h3>
              <p className="text-secondary">
                We strive to respond to all inquiries promptly to make your learning journey as smooth as possible. 
                Whether it’s about signing up for a free trial, discussing your learning path, or asking for support, we’re just a message away!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      {showThankYou && (
        <div ref={thankYouRef} className="text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-4">Thank You for Reaching Out!</h2>
          <p className="text-muted-foreground">
            We’re excited to help you begin your Qur’anic learning journey with us. Thank you for contacting Miftah Quran.
          </p>
        </div>
      )}
    </div>
  );
}
