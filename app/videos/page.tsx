'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Play,
  ExternalLink,
  Search,
  Filter,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  BookOpen,
  Users,
  Award,
  Heart
} from 'lucide-react';

// YouTube lecture videos
const lectureVideos = [
  {
    id: 1,
    title: 'Complete Tajweed Course - Lesson 1: Arabic Alphabet',
    description: 'Learn the basics of Arabic alphabet with proper pronunciation and Tajweed rules.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video IDs
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '45:30',
    views: '12.5K',
    category: 'Tajweed',
    level: 'Beginner',
    instructor: 'Ustadh Ahmed Al-Mahmoud'
  },
  {
    id: 2,
    title: 'Hifz Techniques - Memory Palace Method for Quran',
    description: 'Advanced memorization techniques used by successful Huffaz around the world.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '32:15',
    views: '8.7K',
    category: 'Hifz',
    level: 'Intermediate',
    instructor: 'Ustadh Omar Hassan'
  },
  {
    id: 3,
    title: 'Tafseer Al-Fatiha - Deep Understanding of the Opening',
    description: 'Comprehensive explanation of Surah Al-Fatiha with historical context and meanings.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '58:42',
    views: '15.2K',
    category: 'Tafseer',
    level: 'Advanced',
    instructor: 'Ustadh Yusuf Chen'
  },
  {
    id: 4,
    title: 'Children\'s Quran Learning - Fun with Arabic Letters',
    description: 'Interactive session designed specifically for young learners aged 4-7 years.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '25:18',
    views: '22.1K',
    category: 'Children',
    level: 'Beginner',
    instructor: 'Sister Aisha Malik'
  }
];

// Student showcase videos
const studentVideos = [
  {
    id: 1,
    title: 'Aisha (Age 8) - Beautiful Recitation of Surah Al-Fatiha',
    description: 'Young student showcasing perfect Tajweed after 3 months of learning.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '2:15',
    views: '5.3K',
    studentAge: 8,
    course: 'Tajweed for Young Learners',
    achievement: 'Perfect Pronunciation'
  },
  {
    id: 2,
    title: 'Omar (Age 15) - Memorization Progress Update',
    description: 'Teenage student sharing his Hifz journey and memorization techniques.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '4:32',
    views: '3.8K',
    studentAge: 15,
    course: 'Hifz Program',
    achievement: '5 Paras Memorized'
  },
  {
    id: 3,
    title: 'Fatima (Age 12) - Explaining Tajweed Rules',
    description: 'Student demonstrating her understanding of Qalqalah and Ghunnah rules.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '3:45',
    views: '4.1K',
    studentAge: 12,
    course: 'Advanced Tajweed',
    achievement: 'Teaching Others'
  },
  {
    id: 4,
    title: 'Yusuf (Age 10) - From Beginner to Confident Reader',
    description: 'Amazing transformation of a student who started with zero Arabic knowledge.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '6:20',
    views: '7.2K',
    studentAge: 10,
    course: 'Noorani Qaida to Quran',
    achievement: 'Complete Transformation'
  }
];

const categories = ['All', 'Tajweed', 'Hifz', 'Tafseer', 'Children'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState('lectures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredLectures = lectureVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredStudentVideos = studentVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-6">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Educational Videos
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn from expert instructors and get inspired by our students' amazing progress
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search videos by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lectures" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            YouTube Lectures
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Student Showcase
          </TabsTrigger>
        </TabsList>

        {/* YouTube Lectures Tab */}
        <TabsContent value="lectures" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map((video) => (
              <Card key={video.id} className="transition-all hover:shadow-lg border-2 border-primary/10 hover:border-primary/30">
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">{video.category}</Badge>
                      <Badge variant="outline" className="text-xs">{video.level}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">{video.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{video.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views} views</span>
                      </div>
                      <span>By {video.instructor}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <a href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLectures.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lectures found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>

        {/* Student Showcase Tab */}
        <TabsContent value="students" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudentVideos.map((video) => (
              <Card key={video.id} className="transition-all hover:shadow-lg border-2 border-secondary/10 hover:border-secondary/30">
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-secondary text-white px-2 py-1 rounded text-xs font-medium">
                    Age {video.studentAge}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{video.course}</Badge>
                    <Badge className="text-xs bg-green-500">{video.achievement}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">{video.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{video.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>Inspiring</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="flex-1" asChild>
                        <a href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </a>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudentVideos.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No student videos found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* YouTube Channel CTA */}
      <Card className="mt-12 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-800">Visit Our YouTube Channel</h2>
          </div>
          <p className="text-red-700 mb-6 max-w-2xl mx-auto">
            Subscribe to our YouTube channel for weekly uploads of new lectures, student progress videos,
            and interactive learning sessions. Join our growing community of learners!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <a href="https://youtube.com/@quranlearn" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit YouTube Channel
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-red-300 text-red-700 hover:bg-red-50">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Subscribe & Like
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ready to Start Your Own Success Story?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our students and experience the same amazing progress. Start with our free 3-day trial
            and see the difference personalized instruction makes!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" asChild>
              <a href="/courses">
                Start Free Trial
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10" asChild>
              <a href="/teachers">
                Meet Our Teachers
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}