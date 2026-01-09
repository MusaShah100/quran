// 'use client';

// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   BookOpen,
//   Users,
//   Clock,
//   Calendar,
//   Star,
//   Award,
//   Globe,
//   Heart,
//   GraduationCap,
//   MessageCircle,
//   Play,
//   CheckCircle,
//   Gift,
//   UserCheck,
//   UsersIcon
// } from 'lucide-react';

// // Featured courses derived from provided content (concise, no SEO/target audience fields)
// const featuredCourses = [
//   {
//     id: 'quran-reading',
//     title: 'Qur\'an Reading (Beginner)',
//     languages: ['Urdu', 'English'],
//     summary: 'Build a strong foundation: alphabet, pronunciation, and basic Tajweed with guided reading of 15 Paras.',
//     topics: [
//       'Arabic alphabet & pronunciation',
//       'Basic Tajweed rules',
//       'Read 15 Paras with guidance'
//     ],
//     icon: BookOpen
//   },
//   {
//     id: 'tajweed',
//     title: 'Tajweed (Correct Recitation)',
//     languages: ['Urdu', 'English'],
//     summary: 'Master correct recitation with detailed Tajweed rules, clarity, and fluency.',
//     topics: [
//       'Detailed Tajweed rules',
//       'Correct Arabic pronunciation',
//       'Fluency and clarity'
//     ],
//     icon: GraduationCap
//   },
//   {
//     id: 'hifz',
//     title: 'Qur\'an Memorization (Hifz)',
//     languages: ['Urdu'],
//     summary: 'Structured memorization with personalized plans, repetition techniques, and regular reviews.',
//     topics: [
//       'Memorization techniques',
//       'Personalized Hifz plan',
//       'Regular reviews & retention'
//     ],
//     icon: Award
//   },
//   {
//     id: 'kids',
//     title: 'Children’s Qur\'an Learning',
//     languages: ['Urdu', 'English'],
//     summary: 'Engaging and interactive learning for kids with basics, activities, and introductory Tajweed.',
//     topics: [
//       'Basic Islamic concepts',
//       'Fun, engaging activities',
//       'Intro to Tajweed & recitation'
//     ],
//     icon: Users
//   },
//   {
//     id: 'duas',
//     title: 'Islamic Duas & Supplications',
//     languages: ['Urdu', 'English'],
//     summary: 'Learn common daily duas with meanings, significance, and proper etiquette.',
//     topics: [
//       'Daily duas & occasions',
//       'Meanings & significance',
//       'Pronunciation & etiquette'
//     ],
//     icon: Heart
//   }
// ];

// const courses = [
//   // Tajweed Courses by Age Groups - Updated structure
//   {
//     id: 1,
//     title: 'Tajweed Course - Ages up to 7 years',
//     category: 'Tajweed',
//     ageGroup: 'Up to 7 years',
//     description: 'Fun and interactive Tajweed learning designed for young children with games, stories, and engaging activities.',
//     duration: '3 months',
//     sessionsPerWeek: 2,
//     sessionDuration: '30 minutes',
//     level: 'Beginner',
//     features: [
//       'Interactive games and activities',
//       'Colorful visual aids and animations',
//       'Story-based learning approach',
//       'Basic Arabic letter recognition',
//       'Simple Tajweed rules introduction',
//       'Parent progress reports'
//     ],
//     pricing: {
//       individual: { price: 15, currency: 'USD' },
//       group: { price: 8, currency: 'USD' }
//     },
//     instructor: 'Sister Aisha Malik',
//     students: 45,
//     rating: 4.9,
//     reviews: 23,
//     nextBatch: '2024-02-15',
//     image: '/api/placeholder/300/200'
//   },
//   {
//     id: 2,
//     title: 'Tajweed Course - Ages up to 18 years',
//     category: 'Tajweed',
//     ageGroup: 'Up to 18 years',
//     description: 'Comprehensive Tajweed course for children and teens with structured lessons and interactive learning methods.',
//     duration: '4 months',
//     sessionsPerWeek: 3,
//     sessionDuration: '45 minutes',
//     level: 'Beginner to Intermediate',
//     features: [
//       'Complete Tajweed rules coverage',
//       'Interactive pronunciation practice',
//       'Digital Mushaf with color coding',
//       'Weekly assessments and feedback',
//       'Peer learning activities',
//       'Certificate upon completion'
//     ],
//     pricing: {
//       individual: { price: 18, currency: 'USD' },
//       group: { price: 10, currency: 'USD' }
//     },
//     instructor: 'Ustadh Ahmed Al-Mahmoud',
//     students: 78,
//     rating: 4.8,
//     reviews: 34,
//     nextBatch: '2024-02-20',
//     image: '/api/placeholder/300/200'
//   },
//   {
//     id: 3,
//     title: 'Tajweed Course - Ages up to 25 years',
//     category: 'Tajweed',
//     ageGroup: 'Up to 25 years',
//     description: 'Advanced Tajweed course for young adults focusing on perfecting recitation and developing fluency.',
//     duration: '5 months',
//     sessionsPerWeek: 3,
//     sessionDuration: '60 minutes',
//     level: 'Intermediate to Advanced',
//     features: [
//       'Advanced Tajweed rules and applications',
//       'Recitation practice with feedback',
//       'Qira\'at introduction',
//       'Self-assessment tools',
//       'Peer review sessions',
//       'Competition preparation'
//     ],
//     pricing: {
//       individual: { price: 22, currency: 'USD' },
//       group: { price: 12, currency: 'USD' }
//     },
//     instructor: 'Ustadh Omar Hassan',
//     students: 56,
//     rating: 4.9,
//     reviews: 28,
//     nextBatch: '2024-02-25',
//     image: '/api/placeholder/300/200'
//   },
//   {
//     id: 4,
//     title: 'Tajweed Course - Above 25 years',
//     category: 'Tajweed',
//     ageGroup: 'Above 25 years',
//     description: 'Professional Tajweed course for adults with flexible scheduling and advanced techniques.',
//     duration: '6 months',
//     sessionsPerWeek: 2,
//     sessionDuration: '75 minutes',
//     level: 'All Levels',
//     features: [
//       'Flexible scheduling options',
//       'Professional recitation techniques',
//       'Teaching methodology training',
//       'Advanced Qira\'at studies',
//       'Leadership skills development',
//       'Ijazah preparation pathway'
//     ],
//     pricing: {
//       individual: { price: 25, currency: 'USD' },
//       group: { price: 15, currency: 'USD' }
//     },
//     instructor: 'Sister Fatima Rahman',
//     students: 67,
//     rating: 4.8,
//     reviews: 31,
//     nextBatch: '2024-03-01',
//     image: '/api/placeholder/300/200'
//   },
//   // Hifz Courses
//   {
//     id: 5,
//     title: 'Hifz Program - Individual Classes',
//     category: 'Hifz',
//     ageGroup: 'All Ages',
//     description: 'Individual Hifz program with personalized attention, proven memorization techniques, and spiritual development.',
//     duration: '2-3 years',
//     sessionsPerWeek: 5,
//     sessionDuration: '60 minutes',
//     level: 'All Levels',
//     features: [
//       'Proven memorization techniques',
//       'Daily revision schedule',
//       'Progress tracking system',
//       'Spiritual development sessions',
//       'One-on-one attention',
//       'Flexible pacing',
//       'Graduation ceremony'
//     ],
//     pricing: {
//       individual: { price: 35, currency: 'USD' },
//       group: null // Individual only
//     },
//     instructor: 'Ustadh Omar Hassan',
//     students: 34,
//     rating: 4.9,
//     reviews: 18,
//     nextBatch: '2024-02-10',
//     image: '/api/placeholder/300/200'
//   },

//   // Tarjama o Tafseer Courses
//   {
//     id: 6,
//     title: 'Tafseer Course - Individual Classes',
//     category: 'Tarjama o Tafseer',
//     ageGroup: 'All Ages',
//     description: 'Individual Tafseer classes with deep study of Qur\'anic meanings, context, and scholarly interpretations.',
//     duration: '4 months',
//     sessionsPerWeek: 2,
//     sessionDuration: '75 minutes',
//     level: 'Intermediate',
//     features: [
//       'Word-by-word translation',
//       'Comprehensive Tafseer study',
//       'Historical context studies',
//       'One-on-one discussions',
//       'Personalized learning pace',
//       'Scholarly references'
//     ],
//     pricing: {
//       individual: { price: 30, currency: 'USD' },
//       group: null // Individual only
//     },
//     instructor: 'Ustadh Yusuf Chen',
//     students: 42,
//     rating: 4.7,
//     reviews: 21,
//     nextBatch: '2024-02-22',
//     image: '/api/placeholder/300/200'
//   },
//   {
//     id: 7,
//     title: 'Tafseer Course - Group Classes',
//     category: 'Tarjama o Tafseer',
//     ageGroup: 'All Ages',
//     description: 'Group Tafseer classes with interactive discussions, multiple perspectives, and collaborative learning.',
//     duration: '6 months',
//     sessionsPerWeek: 2,
//     sessionDuration: '90 minutes',
//     level: 'Beginner to Intermediate',
//     features: [
//       'Group discussions and debates',
//       'Multiple Tafseer sources',
//       'Peer learning opportunities',
//       'Interactive sessions',
//       'Comparative study methods',
//       'Community building'
//     ],
//     pricing: {
//       individual: { price: 28, currency: 'USD' },
//       group: { price: 16, currency: 'USD' }
//     },
//     instructor: 'Sister Khadijah Williams',
//     students: 35,
//     rating: 4.9,
//     reviews: 19,
//     nextBatch: '2024-03-01',
//     image: '/api/placeholder/300/200'
//   }
// ];

// const categories = ['All', 'Tajweed', 'Hifz', 'Tarjama o Tafseer'];
// const ageGroups = ['All', 'Up to 7 years', 'Up to 18 years', 'Up to 25 years', 'Above 25 years'];
// const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// export default function CoursesPage() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedAgeGroup] = useState('All');
//   const [selectedLevel] = useState('All');
//   const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

// const filteredCourses = courses.filter(course => {
//     const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
//     const matchesAgeGroup = selectedAgeGroup === 'All' || course.ageGroup === selectedAgeGroup;
//     const matchesLevel = selectedLevel === 'All' || course.level.includes(selectedLevel);

//     return matchesCategory && matchesAgeGroup && matchesLevel;
//   });

//   if (selectedCourse) {
//     return (
//       <div className="container py-6">
//         <Button
//           variant="ghost"
//           onClick={() => setSelectedCourse(null)}
//           className="mb-6"
//         >
//           ← Back to Courses
//         </Button>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Badge variant="secondary">{selectedCourse.category}</Badge>
//                       <Badge variant="outline">{selectedCourse.ageGroup}</Badge>
//                       <Badge variant="outline">{selectedCourse.level}</Badge>
//                     </div>
//                     <CardTitle className="text-2xl mb-2">{selectedCourse.title}</CardTitle>
//                     <CardDescription className="text-lg">{selectedCourse.description}</CardDescription>
//                     <div className="flex items-center gap-4 mt-4">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="font-semibold">{selectedCourse.rating}</span>
//                         <span className="text-muted-foreground">({selectedCourse.reviews} reviews)</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-4 h-4 text-muted-foreground" />
//                         <span className="text-muted-foreground">{selectedCourse.students} students</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="font-semibold mb-3">Course Details</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4 text-primary" />
//                         <span>Duration: {selectedCourse.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-primary" />
//                         <span>{selectedCourse.sessionsPerWeek} sessions per week</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Play className="w-4 h-4 text-primary" />
//                         <span>{selectedCourse.sessionDuration} per session</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <UserCheck className="w-4 h-4 text-primary" />
//                         <span>Instructor: {selectedCourse.instructor}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-3">Pricing</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
//                         <span>Individual Classes:</span>
//                         <span className="font-semibold">${selectedCourse.pricing.individual.price}/session</span>
//                       </div>
//                       {selectedCourse.pricing.group && (
//                         <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
//                           <span>Group Classes:</span>
//                           <span className="font-semibold">${selectedCourse.pricing.group.price}/session</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold mb-3">Course Features</h3>
//                   <div className="grid md:grid-cols-2 gap-2">
//                     {selectedCourse.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                         <span className="text-sm">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Gift className="w-5 h-5 text-green-600" />
//                     <h4 className="font-semibold text-green-800">Free 3-Day Trial</h4>
//                   </div>
//                   <p className="text-sm text-green-700">
//                     Experience our teaching methodology with a completely free 3-day trial.
//                     No payment required, no commitment needed!
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Enroll Now</CardTitle>
//                 <CardDescription>
//                   Choose your preferred learning style
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="p-3 border rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="font-medium">Individual Classes</span>
//                       <span className="text-lg font-bold">${selectedCourse.pricing.individual.price}/session</span>
//                     </div>
//                     <p className="text-xs text-muted-foreground mb-3">
//                       One-on-one personalized attention with flexible scheduling
//                     </p>
//                     <Button className="w-full">
//                       <Gift className="w-4 h-4 mr-2" />
//                       Start Free Trial
//                     </Button>
//                   </div>

//                   {selectedCourse.pricing.group && (
//                     <div className="p-3 border rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium">Group Classes</span>
//                         <span className="text-lg font-bold">${selectedCourse.pricing.group.price}/session</span>
//                       </div>
//                       <p className="text-xs text-muted-foreground mb-3">
//                         Learn with peers in small groups (3-5 students maximum)
//                       </p>
//                       <Button variant="outline" className="w-full">
//                         <UsersIcon className="w-4 h-4 mr-2" />
//                         Join Group Trial
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 <div className="text-center pt-4 border-t">
//                   <p className="text-sm text-muted-foreground mb-2">
//                     Next batch starts: <span className="font-medium">{selectedCourse.nextBatch}</span>
//                   </p>
//                   <Button variant="ghost" size="sm">
//                     <MessageCircle className="w-4 h-4 mr-2" />
//                     Ask Questions
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm">Why Choose This Course?</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-start gap-2">
//                   <Award className="w-4 h-4 text-primary mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Certified Instructors</p>
//                     <p className="text-xs text-muted-foreground">Learn from qualified teachers with proper Ijazah</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <Globe className="w-4 h-4 text-primary mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Flexible Scheduling</p>
//                     <p className="text-xs text-muted-foreground">Classes available across multiple time zones</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <Heart className="w-4 h-4 text-primary mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium">Supportive Community</p>
//                     <p className="text-xs text-muted-foreground">Join a caring learning environment</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-6">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
//         <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//           Structured Islamic education programs with individual and group options.
//           All courses include a free 3-day trial period.
//         </p>
//       </div>

//       {/* Free Trial Banner */}
//       <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
//         <CardContent className="p-6">
//           <div className="flex items-center justify-center gap-4">
//             <Gift className="w-8 h-8 text-green-600" />
//             <div className="text-center">
//               <h2 className="text-xl font-bold text-green-800 mb-1">Free 3-Day Trial for All Courses!</h2>
//               <p className="text-green-700">Experience our teaching methodology with no payment required</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Featured Courses (concise cards) */}
//       <div className="mb-10">
//         <h2 className="text-2xl font-bold mb-4">Featured Qur'an Courses</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredCourses.map((course) => (
//             <Card key={course.id} className="transition-all hover:shadow-lg">
//               <CardHeader>
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     {course.languages.map((lang) => (
//                       <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
//                     ))}
//                   </div>
//                   <course.icon className="w-5 h-5 text-primary" />
//                 </div>
//                 <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//                 <CardDescription className="text-sm">{course.summary}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="space-y-2">
//                     {course.topics.slice(0, 3).map((t, idx) => (
//                       <div key={idx} className="flex items-center gap-2 text-sm">
//                         <CheckCircle className="w-4 h-4 text-green-500" />
//                         <span>{t}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex justify-between items-center pt-2 border-t">
//                     <Button size="sm">
//                       <Gift className="w-4 h-4 mr-2" />
//                       Start Free Trial
//                     </Button>
//                     <Button size="sm" variant="outline" asChild>
//                       <a href="/teachers">Meet Tutors</a>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Key Features of Our Quran Courses */}
//       <Card className="mb-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
//         <CardContent className="p-6">
//           <h3 className="text-xl font-bold mb-4">Key Features of Our Qur'an Courses</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
//               <Award className="w-5 h-5 text-primary" />
//               <div>
//                 <p className="font-medium">Expert Tutors</p>
//                 <p className="text-sm text-muted-foreground">Qualified, experienced instructors</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
//               <Globe className="w-5 h-5 text-primary" />
//               <div>
//                 <p className="font-medium">Flexible Learning</p>
//                 <p className="text-sm text-muted-foreground">Urdu and English modes</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
//               <Heart className="w-5 h-5 text-primary" />
//               <div>
//                 <p className="font-medium">Interactive & Engaging</p>
//                 <p className="text-sm text-muted-foreground">Motivating, student-centered methods</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
//               <BookOpen className="w-5 h-5 text-primary" />
//               <div>
//                 <p className="font-medium">Comprehensive Curriculum</p>
//                 <p className="text-sm text-muted-foreground">Reading, Tajweed, Hifz, Duas</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 p-3 bg-muted/20 rounded">
//               <UserCheck className="w-5 h-5 text-primary" />
//               <div>
//                 <p className="font-medium">Progress Tracking</p>
//                 <p className="text-sm text-muted-foreground">Assessments and feedback</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>


//       {/* <Card className="mb-8">
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-sm font-medium mb-2 block">Category</label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md bg-background"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Age Group</label>
//               <select
//                 value={selectedAgeGroup}
//                 onChange={(e) => setSelectedAgeGroup(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md bg-background"
//               >
//                 {ageGroups.map(age => (
//                   <option key={age} value={age}>{age}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Level</label>
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md bg-background"
//               >
//                 {levels.map(level => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="all" className="mb-8">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="all">All Courses</TabsTrigger>
//           <TabsTrigger value="tajweed">Tajweed</TabsTrigger>
//           <TabsTrigger value="hifz">Hifz</TabsTrigger>
//           <TabsTrigger value="tafseer">Tarjama o Tafseer</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="mt-6">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.map((course) => (
//               <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex gap-2">
//                       <Badge variant="secondary">{course.category}</Badge>
//                       <Badge variant="outline" className="text-xs">{course.ageGroup}</Badge>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-semibold">{course.rating}</span>
//                     </div>
//                   </div>
//                   <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//                   <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{course.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-3 h-3" />
//                         <span>{course.students} students</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         <span>{course.sessionsPerWeek}x/week</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Play className="w-3 h-3" />
//                         <span>{course.sessionDuration}</span>
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center pt-2 border-t">
//                       <div className="text-sm">
//                         <div className="font-semibold">
//                           From ${course.pricing.group ? course.pricing.group.price : course.pricing.individual.price}/session
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {course.pricing.group ? 'Group classes' : 'Individual only'}
//                         </div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCourse(course)}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="tajweed" className="mt-6">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.filter(c => c.category === 'Tajweed').map((course) => (
//               <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2">
//                     <Badge variant="outline" className="text-xs">{course.ageGroup}</Badge>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-semibold">{course.rating}</span>
//                     </div>
//                   </div>
//                   <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//                   <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{course.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-3 h-3" />
//                         <span>{course.students} students</span>
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center pt-2 border-t">
//                       <div className="text-sm">
//                         <div className="font-semibold">
//                           From ${course.pricing.group ? course.pricing.group.price : course.pricing.individual.price}/session
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {course.pricing.group ? 'Group classes' : 'Individual only'}
//                         </div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCourse(course)}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="hifz" className="mt-6">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.filter(c => c.category === 'Hifz').map((course) => (
//               <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2">
//                     <Badge variant="outline" className="text-xs">{course.ageGroup}</Badge>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-semibold">{course.rating}</span>
//                     </div>
//                   </div>
//                   <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//                   <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{course.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-3 h-3" />
//                         <span>{course.students} students</span>
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center pt-2 border-t">
//                       <div className="text-sm">
//                         <div className="font-semibold">
//                           ${course.pricing.individual.price}/session
//                         </div>
//                         <div className="text-xs text-muted-foreground">Individual only</div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCourse(course)}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="tafseer" className="mt-6">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.filter(c => c.category === 'Tarjama o Tafseer').map((course) => (
//               <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2">
//                     <Badge variant="outline" className="text-xs">{course.ageGroup}</Badge>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-semibold">{course.rating}</span>
//                     </div>
//                   </div>
//                   <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//                   <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{course.duration}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-3 h-3" />
//                         <span>{course.students} students</span>
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center pt-2 border-t">
//                       <div className="text-sm">
//                         <div className="font-semibold">
//                           From ${course.pricing.group ? course.pricing.group.price : course.pricing.individual.price}/session
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {course.pricing.group ? 'Individual & Group' : 'Individual only'}
//                         </div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => setSelectedCourse(course)}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {filteredCourses.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//           <h3 className="text-lg font-semibold mb-2">No courses found</h3>
//           <p className="text-muted-foreground">Try adjusting your filter criteria</p>
//         </div>
//       )} */}

//       {/* Call to Action */}
//       <Card className="mt-12">
//         <CardContent className="p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Islamic Learning Journey?</h2>
//           <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
//             Join thousands of students learning with our certified instructors.
//             Start with our free 3-day trial - no payment required!
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Button size="lg">
//               <Gift className="w-4 h-4 mr-2" />
//               Start Free Trial
//             </Button>
//             <Button variant="outline" size="lg">
//               <MessageCircle className="w-4 h-4 mr-2" />
//               Ask Questions
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
