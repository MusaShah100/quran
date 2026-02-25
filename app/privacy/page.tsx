 'use client';
 
 import React from 'react';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Globe, Mail, User, Cookie, Database } from 'lucide-react';
 
 export default function PrivacyPage() {
   const year = new Date().getFullYear();
   const lastUpdated = new Date().toLocaleDateString();
 
   return (
     <div className="container max-w-4xl py-10 space-y-8">
       <div className="flex items-center gap-3 mb-2">
         <Shield className="h-8 w-8 text-primary" />
         <h1 className="text-3xl font-bold">Privacy Policy</h1>
       </div>
       <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
 
       <Card className="bg-primary/5 border-primary/10">
         <CardHeader>
           <CardTitle>Our Commitment</CardTitle>
           <CardDescription>
             Your privacy matters. We collect only what is needed to deliver Qur’an learning services and keep it safe.
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <div className="flex items-center gap-2 text-sm">
             <Lock className="h-4 w-4 text-primary" />
             <span>We never sell your data.</span>
           </div>
           <div className="flex items-center gap-2 text-sm">
             <Globe className="h-4 w-4 text-primary" />
             <span>We comply with applicable privacy laws where we operate.</span>
           </div>
         </CardContent>
       </Card>
 
       <div className="grid md:grid-cols-2 gap-6">
         <Card>
           <CardHeader>
             <div className="flex items-center gap-2">
               <User className="h-5 w-5 text-primary" />
               <CardTitle>Information We Collect</CardTitle>
             </div>
             <CardDescription>Only what’s necessary to provide classes and support</CardDescription>
           </CardHeader>
           <CardContent className="space-y-2 text-sm text-muted-foreground">
             <ul className="list-disc pl-5 space-y-1">
               <li>Name, email, phone, country</li>
               <li>Enrollment preferences and selected courses</li>
               <li>Messages sent via contact or WhatsApp</li>
               <li>Basic usage and device information for performance and security</li>
             </ul>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <div className="flex items-center gap-2">
               <Database className="h-5 w-5 text-primary" />
               <CardTitle>How We Use Your Information</CardTitle>
             </div>
             <CardDescription>To provide and improve our learning services</CardDescription>
           </CardHeader>
           <CardContent className="space-y-2 text-sm text-muted-foreground">
             <ul className="list-disc pl-5 space-y-1">
               <li>Scheduling classes and sending confirmations</li>
               <li>Providing support and responding to inquiries</li>
               <li>Improving course quality and platform experience</li>
               <li>Legal compliance and fraud prevention</li>
             </ul>
           </CardContent>
         </Card>
       </div>
 
       <Card>
         <CardHeader>
           <div className="flex items-center gap-2">
             <Cookie className="h-5 w-5 text-primary" />
             <CardTitle>Cookies and Analytics</CardTitle>
           </div>
           <CardDescription>Used to keep the site secure and user-friendly</CardDescription>
         </CardHeader>
         <CardContent className="text-sm text-muted-foreground space-y-2">
           <p>We may use essential cookies for authentication and session management, and basic analytics to understand site performance.</p>
           <p>You can control cookies via your browser settings. Disabling certain cookies may affect functionality.</p>
         </CardContent>
       </Card>
 
       <Card>
         <CardHeader>
           <div className="flex items-center gap-2">
             <Mail className="h-5 w-5 text-primary" />
             <CardTitle>Contact and Data Requests</CardTitle>
           </div>
         </CardHeader>
         <CardContent className="text-sm text-muted-foreground space-y-2">
           <p>To request access, correction, or deletion of your data, contact us at:</p>
           <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">learn@miftahquran.com</Badge>
         </CardContent>
       </Card>
 
       <p className="text-xs text-muted-foreground">© {year} Miftah Quran</p>
     </div>
   );
 }
