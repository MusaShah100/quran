import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Edit, Eye, Trash2, Plus } from 'lucide-react';

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

type NewCourse = {
  title: string;
  category: string;
  ageGroup: string;
  description: string;
  duration: string;
  sessionsPerWeek: number;
  sessionDuration: string;
  instructor: string;
  price: { individual: number; group: number };
  features: string;
};

export function CoursesTab({
  courses,
  newCourse,
  setNewCourse,
  onAddCourse,
}: {
  courses: Course[];
  newCourse: NewCourse;
  setNewCourse: React.Dispatch<React.SetStateAction<NewCourse>>;
  onAddCourse: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>Create a new learning course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="Online Tajweed Learning - Little Stars"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="Tajweed">Tajweed</option>
                  <option value="Hifz">Hifz</option>
                  <option value="Tarjama o Tafseer">Tarjama o Tafseer</option>
                </select>
              </div>
              <div>
                <Label htmlFor="age-group">Age Group</Label>
                <select
                  id="age-group"
                  value={newCourse.ageGroup}
                  onChange={(e) => setNewCourse({ ...newCourse, ageGroup: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="4-7 years">4-7 years</option>
                  <option value="8-12 years">8-12 years</option>
                  <option value="12-18 years">12-18 years</option>
                  <option value="19-25 years">19-25 years</option>
                  <option value="25+ years">25+ years</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Course description and learning objectives..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="3 months"
                />
              </div>
              <div>
                <Label htmlFor="sessions-week">Sessions/Week</Label>
                <Input
                  id="sessions-week"
                  type="number"
                  value={newCourse.sessionsPerWeek}
                  onChange={(e) => setNewCourse({ ...newCourse, sessionsPerWeek: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="session-duration">Session Duration</Label>
                <Input
                  id="session-duration"
                  value={newCourse.sessionDuration}
                  onChange={(e) => setNewCourse({ ...newCourse, sessionDuration: e.target.value })}
                  placeholder="30 minutes"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                placeholder="Sister Aisha Malik"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="individual-price">Individual Price ($)</Label>
                <Input
                  id="individual-price"
                  type="number"
                  value={newCourse.price.individual}
                  onChange={(e) => setNewCourse({
                    ...newCourse,
                    price: { ...newCourse.price, individual: Number(e.target.value) },
                  })}
                />
              </div>
              <div>
                <Label htmlFor="group-price">Group Price ($)</Label>
                <Input
                  id="group-price"
                  type="number"
                  value={newCourse.price.group}
                  onChange={(e) => setNewCourse({
                    ...newCourse,
                    price: { ...newCourse.price, group: Number(e.target.value) },
                  })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Features (comma separated)</Label>
              <Textarea
                id="features"
                value={newCourse.features}
                onChange={(e) => setNewCourse({ ...newCourse, features: e.target.value })}
                placeholder="Interactive games, Visual aids, Progress tracking"
                rows={2}
              />
            </div>

            <Button onClick={onAddCourse} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Manage existing courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.ageGroup}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Instructor: {course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>Individual: ${course.price.individual}</span>
                      <span>Group: ${course.price.group}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

