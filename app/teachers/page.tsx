'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Star, 
  Calendar,
  Clock,
  Globe,
  Award,
  BookOpen,
  MessageCircle,
  Search,
  Filter,
  Video,
  Heart,
  GraduationCap,
  Phone,
  Mail
} from 'lucide-react';

const teachers = [
  {
    id: 1,
    name: 'Ustadh Ahmed Al-Mahmoud',
    title: 'Senior Qur\'an & Tajweed Instructor',
    image: '/api/placeholder/150/150',
    rating: 4.9,
    reviews: 247,
    experience: '4 years',
    specialties: ['Tajweed', 'Hifz', 'Qira\'at'],
    languages: ['Arabic', 'English', 'Urdu'],
    education: 'PhD Islamic Studies, Al-Azhar University',
    ijazah: ['Hafs an Asim', 'Warsh an Nafi'],
    students: 6,
    availability: 'Available',
    timezone: 'GMT+3 (Cairo)',
    hourlyRate: { individual: 25, group: 15 },
    bio: 'Ustadh Ahmed brings 4 years of dedicated teaching experience with a passion for helping students master Qur\'an recitation. Despite being newer to teaching, his academic excellence and student-focused approach have already made a significant impact.',
    achievements: ['PhD in Islamic Studies', 'Multiple Ijazah Certifications', 'Specialized in Modern Teaching Methods'],
    teachingStyle: 'Patient and methodical approach with emphasis on proper pronunciation and spiritual connection.',
    phone: '+20 123 456 789',
    email: 'ahmed.mahmoud@quranlearn.com',
    ageGroups: ['4-7 years', '8-12 years', '12-18 years', '19-25 years', '25+ years'],
    courses: ['Tajweed', 'Hifz', 'Tarjama o Tafseer']
  },
  {
    id: 2,
    name: 'Sister Fatima Rahman',
    title: 'Qur\'an & Arabic Language Teacher',
    image: '/api/placeholder/150/150',
    rating: 4.8,
    reviews: 189,
    experience: '5 years',
    specialties: ['Tajweed', 'Arabic Grammar', 'Translation'],
    languages: ['Arabic', 'English', 'Bengali'],
    education: 'MA Islamic Studies, IIIT',
    ijazah: ['Hafs an Asim'],
    students: 5,
    availability: 'Available',
    timezone: 'GMT+6 (Dhaka)',
    hourlyRate: { individual: 22, group: 12 },
    bio: 'Sister Fatima brings 5 years of focused experience in teaching women and children. Her gentle approach and dedication to each student\'s progress creates an encouraging learning environment.',
    achievements: ['MA Islamic Studies', 'Women\'s Education Specialist', 'Child-Friendly Teaching Methods'],
    teachingStyle: 'Nurturing and encouraging environment with focus on building confidence and love for the Qur\'an.',
    phone: '+880 123 456 789',
    email: 'fatima.rahman@quranlearn.com',
    ageGroups: ['4-7 years', '8-12 years', '12-18 years', '19-25 years'],
    courses: ['Tajweed', 'Tarjama o Tafseer']
  },
  {
    id: 3,
    name: 'Ustadh Omar Hassan',
    title: 'Hifz & Qira\'at Specialist',
    image: '/api/placeholder/150/150',
    rating: 4.9,
    reviews: 156,
    experience: '4 years',
    specialties: ['Hifz', 'Qira\'at', 'Tajweed'],
    languages: ['Arabic', 'English', 'French'],
    education: 'Graduate of Madinah University',
    ijazah: ['Multiple Qira\'at', 'Complete Hifz'],
    students: 6,
    availability: 'Limited',
    timezone: 'GMT+1 (Paris)',
    hourlyRate: { individual: 30, group: 18 },
    bio: 'Ustadh Omar combines 4 years of teaching experience with exceptional mastery of Qira\'at. His students benefit from his deep knowledge and personalized memorization techniques.',
    achievements: ['Madinah University Graduate', 'Multiple Qira\'at Mastery', 'Proven Hifz Success Methods'],
    teachingStyle: 'Structured and disciplined approach with emphasis on memorization techniques and spiritual development.',
    phone: '+33 123 456 789',
    email: 'omar.hassan@quranlearn.com',
    ageGroups: ['8-12 years', '12-18 years', '19-25 years', '25+ years'],
    courses: ['Hifz', 'Tajweed']
  },
  {
    id: 4,
    name: 'Sister Aisha Malik',
    title: 'Children\'s Qur\'an Teacher',
    image: '/api/placeholder/150/150',
    rating: 4.7,
    reviews: 203,
    experience: '5 years',
    specialties: ['Children\'s Tajweed', 'Basic Arabic', 'Islamic Stories'],
    languages: ['English', 'Urdu', 'Hindi'],
    education: 'BA Islamic Education, Jamia Millia',
    ijazah: ['Hafs an Asim'],
    students: 5,
    availability: 'Available',
    timezone: 'GMT+5 (Karachi)',
    hourlyRate: { individual: 18, group: 10 },
    bio: 'Sister Aisha has dedicated 5 years to perfecting child-friendly Qur\'an education. Her innovative methods make learning enjoyable while maintaining the reverence of Islamic education.',
    achievements: ['BA Islamic Education', 'Child Psychology Training', 'Interactive Learning Specialist'],
    teachingStyle: 'Fun and interactive methods with games, stories, and visual aids to keep children engaged.',
    phone: '+92 123 456 789',
    email: 'aisha.malik@quranlearn.com',
    ageGroups: ['4-7 years', '8-12 years'],
    courses: ['Tajweed']
  },
  {
    id: 5,
    name: 'Ustadh Yusuf Chen',
    title: 'Tafseer & Translation Expert',
    image: '/api/placeholder/150/150',
    rating: 4.8,
    reviews: 134,
    experience: '4 years',
    specialties: ['Tafseer', 'Translation', 'Arabic Literature'],
    languages: ['Arabic', 'English', 'Mandarin'],
    education: 'MA Qur\'anic Studies, Al-Azhar',
    ijazah: ['Tafseer Certification'],
    students: 6,
    availability: 'Available',
    timezone: 'GMT+8 (Beijing)',
    hourlyRate: { individual: 28, group: 16 },
    bio: 'Ustadh Yusuf combines 4 years of teaching experience with deep scholarly knowledge. His multilingual abilities help students from diverse backgrounds understand Qur\'anic meanings.',
    achievements: ['MA Qur\'anic Studies', 'Multilingual Teaching', 'Tafseer Research Specialist'],
    teachingStyle: 'Scholarly and analytical approach with emphasis on understanding context and deeper meanings.',
    phone: '+86 123 456 789',
    email: 'yusuf.chen@quranlearn.com',
    ageGroups: ['12-18 years', '19-25 years', '25+ years'],
    courses: ['Tarjama o Tafseer', 'Tajweed']
  },
  {
    id: 6,
    name: 'Sister Khadijah Williams',
    title: 'New Muslim Support Teacher',
    image: '/api/placeholder/150/150',
    rating: 4.9,
    reviews: 98,
    experience: '5 years',
    specialties: ['Basic Tajweed', 'Islamic Foundations', 'New Muslim Support'],
    languages: ['English', 'Spanish'],
    education: 'Islamic Studies Diploma, Bayyinah Institute',
    ijazah: ['Hafs an Asim'],
    students: 5,
    availability: 'Available',
    timezone: 'GMT-5 (New York)',
    hourlyRate: { individual: 20, group: 12 },
    bio: 'Sister Khadijah brings 5 years of experience helping new Muslims begin their Qur\'an journey. As a revert herself, she understands the unique challenges and provides compassionate guidance.',
    achievements: ['Bayyinah Institute Graduate', 'New Muslim Specialist', 'Community Support Leader'],
    teachingStyle: 'Compassionate and understanding approach with focus on building strong Islamic foundations.',
    phone: '+1 123 456 789',
    email: 'khadijah.williams@quranlearn.com',
    ageGroups: ['19-25 years', '25+ years'],
    courses: ['Tajweed', 'Tarjama o Tafseer']
  }
];

const specialties = ['All', 'Tajweed', 'Hifz', 'Tafseer', 'Children\'s Classes', 'New Muslims', 'Qira\'at'];
const languages = ['All', 'Arabic', 'English', 'Urdu', 'Bengali', 'French', 'Spanish', 'Mandarin'];
const ageGroups = ['All', '4-7 years', '8-12 years', '12-18 years', '19-25 years', '25+ years'];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'All' || teacher.specialties.includes(selectedSpecialty);
    const matchesLanguage = selectedLanguage === 'All' || teacher.languages.includes(selectedLanguage);
    const matchesAgeGroup = selectedAgeGroup === 'All' || teacher.ageGroups.includes(selectedAgeGroup);
    
    return matchesSearch && matchesSpecialty && matchesLanguage && matchesAgeGroup;
  });

  if (selectedTeacher) {
    return (
      <div className="container py-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedTeacher(null)}
          className="mb-6"
        >
          ← Back to Teachers
        </Button>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{selectedTeacher.name}</CardTitle>
                    <CardDescription className="text-lg mb-3">{selectedTeacher.title}</CardDescription>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{selectedTeacher.rating}</span>
                        <span className="text-muted-foreground">({selectedTeacher.reviews} reviews)</span>
                      </div>
                      <Badge variant={selectedTeacher.availability === 'Available' ? 'default' : 'secondary'}>
                        {selectedTeacher.availability}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.specialties.map(specialty => (
                        <Badge key={specialty} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{selectedTeacher.bio}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Teaching Style</h3>
                  <p className="text-muted-foreground">{selectedTeacher.teachingStyle}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Qualifications</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>{selectedTeacher.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span>Experience: {selectedTeacher.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>Ijazah: {selectedTeacher.ijazah.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{selectedTeacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{selectedTeacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Timezone: {selectedTeacher.timezone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Age Groups & Courses</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Age Groups:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedTeacher.ageGroups.map(age => (
                          <Badge key={age} variant="secondary" className="text-xs">{age}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Courses:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedTeacher.courses.map(course => (
                          <Badge key={course} variant="outline" className="text-xs">{course}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Achievements</h3>
                  <div className="grid gap-2">
                    {selectedTeacher.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Class</CardTitle>
                <CardDescription>
                  Start your learning journey today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Individual Class</span>
                    <span className="font-semibold">${selectedTeacher.hourlyRate.individual}/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Group Class</span>
                    <span className="font-semibold">${selectedTeacher.hourlyRate.group}/hour</span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 Free 3-day trial available for all courses!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Free Trial
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Student Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      "Excellent teacher! My Tajweed improved significantly."
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">- Sarah M.</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      "Patient and knowledgeable. Highly recommended!"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">- Ahmed K.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Qualified Teachers</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet our dedicated team of certified instructors. While our platform is new, our teachers 
          bring 4-5 years of focused experience and have successfully guided students in their Qur'an learning journey.
        </p>
      </div>

      {/* New Platform Notice */}
      <Card className="mb-8 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Growing Learning Community</h3>
              <p className="text-sm text-blue-700">
                We're a new platform with experienced teachers who are passionate about Qur'an education. 
                Each instructor has 4-5 years of teaching experience and has successfully guided 5-6 students each. 
                Join us as we build a supportive learning community together!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search teachers by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Specialty</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Language</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>

              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Age Group</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>

              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All');
                setSelectedLanguage('All');
                setSelectedAgeGroup('All');
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="transition-all hover:shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <CardDescription className="text-sm">{teacher.title}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{teacher.rating}</span>
                    </div>
                    <Badge variant={teacher.availability === 'Available' ? 'default' : 'secondary'} className="text-xs">
                      {teacher.availability}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {teacher.specialties.slice(0, 3).map(specialty => (
                    <Badge key={specialty} variant="outline" className="text-xs">{specialty}</Badge>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{teacher.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3 h-3" />
                    <span>{teacher.students} students taught</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span>{teacher.languages.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Age Groups:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.ageGroups.slice(0, 3).map(age => (
                      <Badge key={age} variant="secondary" className="text-xs">{age}</Badge>
                    ))}
                    {teacher.ageGroups.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{teacher.ageGroups.length - 3}</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">From </span>
                    <span className="font-semibold">${teacher.hourlyRate.individual}/hr</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No teachers found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Call to Action */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our growing community of learners! All our experienced teachers offer free 3-day trial classes. 
            Book your trial today and experience personalized Qur'an education.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Book Free Trial
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}