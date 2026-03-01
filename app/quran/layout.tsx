import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Qur’an Reader — Word‑by‑Word, Tajwīd & Translations | Miftah Quran",
  description:
    "Read the Qur’an online with word‑by‑word highlighting, Tajwīd colors, English/Urdu translations, and Surah/Juz navigation.",
  applicationName: "Miftah Quran",
  keywords: [
    "Quran",
    "Holy Quran",
    "Quran online",
    "Quran reader",
    "Quran word by word",
    "Tajweed",
    "Tajwīd colors",
    "Quran tajweed",
    "Quran translation English",
    "Quran translation Urdu",
    "Read Quran online",
    "Learn Quran online",
    "Surah",
    "Juz",
    "Para",
    "Mushaf",
    "Arabic Quran",
    "Quran recitation",
    "Quran morphology",
    "Quran root lemma",
    "Quran lessons"
  ],
  alternates: {
    canonical: "/quran"
  },
  metadataBase: new URL("https://miftahquran.com"),
  openGraph: {
    title: "Qur’an Reader — Word‑by‑Word, Tajwīd & Translations",
    description:
      "Interactively read the Qur’an with Tajwīd colors, word‑by‑word view, and English/Urdu translations.",
    url: "https://miftahquran.com/quran",
    siteName: "Miftah Quran",
    images: [
      {
        url: "/images/logo.png",
        alt: "Miftah Quran"
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Qur’an Reader — Word‑by‑Word, Tajwīd & Translations",
    description:
      "Interactively read the Qur’an with Tajwīd colors, word‑by‑word view, and translations.",
    images: ["/images/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "Religion",
  creator: "Miftah Quran",
  publisher: "Miftah Quran",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return children;
}
