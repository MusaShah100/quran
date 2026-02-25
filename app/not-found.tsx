 'use client';
 
 import React from 'react';
 import Link from 'next/link';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent } from '@/components/ui/card';
 import { Search, Home, BookOpen, LifeBuoy, Sparkles } from 'lucide-react';
 
 export default function NotFoundPage() {
   return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-secondary/25 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-24 left-1/2 h-64 w-64 rounded-full bg-accent/25 blur-2xl animate-blob" style={{ animationDelay: '6s' }} />
      </div>
       <Card className="max-w-2xl w-full shadow-xl border-primary/10">
         <CardContent className="p-8 space-y-6 text-center">
           <div className="inline-flex items-center gap-3">
             <Sparkles className="h-6 w-6 text-secondary" />
             <span className="text-xs font-semibold tracking-widest text-secondary">STATUS 404</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold">Page Not Found</h1>
           <p className="text-muted-foreground">
             The page you’re looking for doesn’t exist or may have moved. Try one of the helpful links below.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
             <Button asChild className="w-full">
               <Link href="/">
                 <Home className="h-4 w-4 mr-2" />
                 Go to Home
               </Link>
             </Button>
             <Button asChild variant="outline" className="w-full">
               <Link href="/courses">
                 <BookOpen className="h-4 w-4 mr-2" />
                 Browse Courses
               </Link>
             </Button>
             <Button asChild variant="outline" className="w-full">
               <Link href="/pricing">
                 <Search className="h-4 w-4 mr-2" />
                 View Pricing
               </Link>
             </Button>
             <Button asChild className="w-full">
               <Link href="/contact">
                 <LifeBuoy className="h-4 w-4 mr-2" />
                 Contact Support
               </Link>
             </Button>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }
