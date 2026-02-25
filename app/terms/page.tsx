 'use client';
 
 import React from 'react';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scale, CheckCircle2, Clock, Users, FileText } from 'lucide-react';
 
 export default function TermsPage() {
   const year = new Date().getFullYear();
   const lastUpdated = new Date().toLocaleDateString();
 
   return (
     <div className="container max-w-4xl py-10 space-y-8">
       <div className="flex items-center gap-3 mb-2">
         <Scale className="h-8 w-8 text-primary" />
         <h1 className="text-3xl font-bold">Terms of Service</h1>
       </div>
       <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
 
       <Card className="bg-secondary/10 border-secondary/20">
         <CardHeader>
           <CardTitle>Agreement</CardTitle>
           <CardDescription>
             By using Miftah Quran, you agree to these terms and to our Privacy Policy.
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-2 text-sm text-muted-foreground">
           <p>These terms govern enrollment, scheduling, payments, and appropriate use of our platform.</p>
         </CardContent>
       </Card>
 
       <div className="grid md:grid-cols-2 gap-6">
         <Card>
           <CardHeader>
             <div className="flex items-center gap-2">
               <Users className="h-5 w-5 text-primary" />
               <CardTitle>Enrollment & Classes</CardTitle>
             </div>
           </CardHeader>
           <CardContent className="space-y-2 text-sm text-muted-foreground">
             <ul className="list-disc pl-5 space-y-1">
               <li>Free trial is provided before enrollment.</li>
               <li>Scheduling is coordinated based on teacher availability and your timezone.</li>
               <li>Consistency and punctuality help maintain learning progress.</li>
               <li>We may adjust instructors where beneficial for learning outcomes.</li>
             </ul>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <div className="flex items-center gap-2">
               <Clock className="h-5 w-5 text-primary" />
               <CardTitle>Payments & Refunds</CardTitle>
             </div>
           </CardHeader>
           <CardContent className="space-y-2 text-sm text-muted-foreground">
             <ul className="list-disc pl-5 space-y-1">
               <li>Payments cover scheduled classes according to the selected plan.</li>
               <li>Refunds are considered case‑by‑case for unused sessions.</li>
               <li>Income‑based fees may be offered where applicable.</li>
               <li>No charge is required for the free trial class.</li>
             </ul>
           </CardContent>
         </Card>
       </div>
 
       <Card>
         <CardHeader>
           <div className="flex items-center gap-2">
             <FileText className="h-5 w-5 text-primary" />
             <CardTitle>Acceptable Use</CardTitle>
           </div>
           <CardDescription>Maintain respectful behavior and lawful use.</CardDescription>
         </CardHeader>
         <CardContent className="text-sm text-muted-foreground space-y-2">
           <ul className="list-disc pl-5 space-y-1">
             <li>Respect teachers and other learners; no harassment or harmful conduct.</li>
             <li>Do not attempt to disrupt services or misuse platform features.</li>
             <li>Recording of sessions may require mutual consent and will be used solely for learning purposes.</li>
             <li>Course content and materials remain the property of Miftah Quran.</li>
           </ul>
         </CardContent>
       </Card>
 
       <Card>
         <CardHeader>
           <div className="flex items-center gap-2">
             <CheckCircle2 className="h-5 w-5 text-primary" />
             <CardTitle>Changes to These Terms</CardTitle>
           </div>
         </CardHeader>
         <CardContent className="text-sm text-muted-foreground">
           We may update these terms to reflect improvements in our services. Continued use after updates indicates acceptance.
         </CardContent>
       </Card>
 
       <p className="text-xs text-muted-foreground">© {year} Miftah Quran</p>
     </div>
   );
 }
