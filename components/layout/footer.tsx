'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Mail, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-muted/40">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full shadow-lg cursor-pointer transition-all hover:scale-110">
          <a
            href="https://wa.me/1234567890?text=Hello! I need help with Miftah Quran platform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.205-.242-.58-.487-.501-.67-.51-.173-.009-.372-.011-.571-.011-.198 0-.521.074-.794.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.487.709.306 1.262.489 1.693.626.711.226 1.36.194 1.873.118.571-.085 1.758-.718 2.005-1.413.247-.695.247-1.29.173-1.413-.074-.123-.272-.198-.57-.347z" />
              <path d="M12.004 2.002c-5.522 0-10 4.477-10 9.998 0 1.762.463 3.415 1.27 4.846l-1.349 4.932 5.043-1.322c1.394.762 2.99 1.199 4.664 1.199 5.522 0 9.998-4.477 9.998-9.998s-4.476-9.655-9.998-9.655zm0 18.31c-1.517 0-2.935-.45-4.121-1.225l-.295-.187-2.996.787.801-2.925-.193-.301c-.76-1.214-1.2-2.62-1.2-4.094 0-4.329 3.522-7.851 7.852-7.851 4.329 0 7.85 3.522 7.85 7.851 0 4.329-3.521 7.95-7.85 7.95z" />
            </svg>
          </a>
        </div>
        <div className="bg-secondary hover:bg-secondary/80 text-secondary-foreground p-3 rounded-full shadow-lg cursor-pointer transition-all hover:scale-110">
          <a
            href="https://m.me/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Miftah Quran Logo"
                width={132}
                height={132}
                className="rounded-lg"
              />
            </div>
            <h3 className="font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              An online Qur’an learning institute focused on correct Tajweed, guided teaching, and accessible education for children and adults.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary">
                  {t.nav.courses}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>learn@miftahquran.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.149-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.205-.242-.58-.487-.501-.67-.51-.173-.009-.372-.011-.571-.011-.198 0-.521.074-.794.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.487.709.306 1.262.489 1.693.626.711.226 1.36.194 1.873.118.571-.085 1.758-.718 2.005-1.413.247-.695.247-1.29.173-1.413-.074-.123-.272-.198-.57-.347z" />
                  <path d="M12.004 2.002c-5.522 0-10 4.477-10 9.998 0 1.762.463 3.415 1.27 4.846l-1.349 4.932 5.043-1.322c1.394.762 2.99 1.199 4.664 1.199 5.522 0 9.998-4.477 9.998-9.998s-4.476-9.655-9.998-9.655zm0 18.31c-1.517 0-2.935-.45-4.121-1.225l-.295-.187-2.996.787.801-2.925-.193-.301c-.76-1.214-1.2-2.62-1.2-4.094 0-4.329 3.522-7.851 7.852-7.851 4.329 0 7.85 3.522 7.85 7.851 0 4.329-3.521 7.95-7.85 7.95z" />
                </svg>
                <a
                  href="https://wa.me/1234567890?text=Hello! I need help with Miftah Quran platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="text-sm text-primary hover:underline"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Miftah Quran. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary">{t.footer.terms}</Link>
            <Link href="/accessibility" className="text-muted-foreground hover:text-primary">{t.footer.accessibility}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
