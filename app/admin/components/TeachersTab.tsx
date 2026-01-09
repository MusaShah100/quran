import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Edit, Eye, Trash2, Plus } from 'lucide-react';

type Teacher = {
  id: number;
  name: string;
  email: string;
  specialties: string[];
  students: number;
  status: string;
};

type NewTeacher = {
  name: string;
  email: string;
  phone: string;
  specialties: string;
  experience: string;
  education: string;
  bio: string;
  hourlyRate: { individual: number; group: number };
};

export function TeachersTab({
  teachers,
  newTeacher,
  setNewTeacher,
  onAddTeacher,
}: {
  teachers: Teacher[];
  newTeacher: NewTeacher;
  setNewTeacher: React.Dispatch<React.SetStateAction<NewTeacher>>;
  onAddTeacher: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Teachers</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Teacher</CardTitle>
            <CardDescription>Fill in the teacher's information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Ustadh/Sister Name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={newTeacher.experience}
                  onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                  placeholder="5 years"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialties">Specialties (comma separated)</Label>
              <Input
                id="specialties"
                value={newTeacher.specialties}
                onChange={(e) => setNewTeacher({ ...newTeacher, specialties: e.target.value })}
                placeholder="Tajweed, Hifz, Qira'at"
              />
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={newTeacher.education}
                onChange={(e) => setNewTeacher({ ...newTeacher, education: e.target.value })}
                placeholder="PhD Islamic Studies, Al-Azhar University"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="individual-rate">Individual Rate ($)</Label>
                <Input
                  id="individual-rate"
                  type="number"
                  value={newTeacher.hourlyRate.individual}
                  onChange={(e) => setNewTeacher({
                    ...newTeacher,
                    hourlyRate: { ...newTeacher.hourlyRate, individual: Number(e.target.value) },
                  })}
                />
              </div>
              <div>
                <Label htmlFor="group-rate">Group Rate ($)</Label>
                <Input
                  id="group-rate"
                  type="number"
                  value={newTeacher.hourlyRate.group}
                  onChange={(e) => setNewTeacher({
                    ...newTeacher,
                    hourlyRate: { ...newTeacher.hourlyRate, group: Number(e.target.value) },
                  })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={newTeacher.bio}
                onChange={(e) => setNewTeacher({ ...newTeacher, bio: e.target.value })}
                placeholder="Brief description of teaching experience and approach..."
                rows={3}
              />
            </div>

            <Button onClick={onAddTeacher} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Teachers</CardTitle>
            <CardDescription>Manage existing teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    <div className="flex gap-1 mt-2">
                      {teacher.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{teacher.students} students</p>
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

