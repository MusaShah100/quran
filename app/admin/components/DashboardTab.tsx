import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Video, Upload, Plus, BarChart3 } from 'lucide-react';

type Teacher = {
  id: number;
  name: string;
  email: string;
  specialties: string[];
  students: number;
  status: string;
};

type Course = {
  id: number;
  title: string;
  category: string;
  ageGroup: string;
  instructor: string;
  students: number;
  price: { individual: number; group: number };
  status: string;
};

type VideoItem = {
  id: number;
  title: string;
  category: string;
  duration: string;
  views: number;
  status: string;
};

export function DashboardTab({ teachers, courses, videos }: { teachers: Teacher[]; courses: Course[]; videos: VideoItem[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">{teachers.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published Videos</p>
                <p className="text-2xl font-bold">{videos.filter(v => v.status === 'Published').length}</p>
              </div>
              <Video className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{teachers.reduce((sum, t) => sum + t.students, 0)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                <Plus className="w-4 h-4 text-success" />
                <span className="text-sm">New teacher added: Sister Aisha Malik</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-sm">Video uploaded: Teen Success Story</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span className="text-sm">Course updated: Tajweed for Adults</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add New Teacher
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Student Video
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

