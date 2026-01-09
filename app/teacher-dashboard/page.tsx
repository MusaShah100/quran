'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Users,
  Calendar,
  DollarSign,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Search,
  Filter,
  Video,
  ExternalLink,
  Send,
  Banknote,
  Play,
  Target,
  Palette,
  Volume2
} from 'lucide-react';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageDialog, setMessageDialog] = useState(false);
  const [videoCallDialog, setVideoCallDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [selectedPara, setSelectedPara] = useState(1);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);

  // Mock teacher data
  const teacherInfo = {
    name: 'Sister Fatima Rahman',
    email: 'fatima@quranlearn.com',
    phone: '+880 123 456 789',
    specialties: ['Tajweed', 'Arabic Grammar', 'Translation'],
    totalStudents: 32,
    activeClasses: 8,
    monthlyEarnings: 2840,
    rating: 4.8,
    completionRate: 94
  };

  // Mock students data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Aisha Ahmed',
      age: 8,
      course: 'Tajweed for Young Learners',
      enrollmentDate: '2024-01-15',
      lastAttended: '2024-02-10',
      attendance: 85,
      feeStatus: 'Paid',
      progress: 75,
      phone: '+1 234 567 8901',
      email: 'parent@example.com',
      notes: 'Excellent progress in pronunciation',
      nextClass: '2024-02-12 10:00 AM'
    },
    {
      id: 2,
      name: 'Omar Hassan',
      age: 12,
      course: 'Tajweed for Teens',
      enrollmentDate: '2024-01-20',
      lastAttended: '2024-02-09',
      attendance: 92,
      feeStatus: 'Paid',
      progress: 88,
      phone: '+1 234 567 8902',
      email: 'omar.parent@example.com',
      notes: 'Very dedicated student, asks good questions',
      nextClass: '2024-02-12 2:00 PM'
    },
    {
      id: 3,
      name: 'Zainab Ali',
      age: 15,
      course: 'Advanced Tajweed',
      enrollmentDate: '2024-02-01',
      lastAttended: '2024-02-08',
      attendance: 78,
      feeStatus: 'Pending',
      progress: 65,
      phone: '+1 234 567 8903',
      email: 'zainab.family@example.com',
      notes: 'Needs more practice with Qalqalah rules',
      nextClass: '2024-02-12 4:00 PM'
    },
    {
      id: 4,
      name: 'Yusuf Ibrahim',
      age: 10,
      course: 'Tajweed for Young Learners',
      enrollmentDate: '2024-01-10',
      lastAttended: '2024-02-10',
      attendance: 96,
      feeStatus: 'Paid',
      progress: 82,
      phone: '+1 234 567 8904',
      email: 'yusuf.dad@example.com',
      notes: 'Exceptional student, ready for advanced level',
      nextClass: '2024-02-12 11:00 AM'
    },
    {
      id: 5,
      name: 'Maryam Khan',
      age: 7,
      course: 'Tajweed for Little Stars',
      enrollmentDate: '2024-01-25',
      lastAttended: '2024-02-07',
      attendance: 68,
      feeStatus: 'Overdue',
      progress: 45,
      phone: '+1 234 567 8905',
      email: 'maryam.mom@example.com',
      notes: 'Missed several classes, needs catch-up session',
      nextClass: '2024-02-12 9:00 AM'
    }
  ]);

  const [messageContent, setMessageContent] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-success';
    if (attendance >= 75) return 'text-warning';
    return 'text-destructive';
  };

  // Free messaging API integration (using EmailJS for demo)
  const sendMessage = async (studentId: number, message: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // In a real app, you would integrate with EmailJS, Twilio, or similar service
    console.log(`Sending message to ${student.name} (${student.email}): ${message}`);

    // Simulate API call
    setTimeout(() => {
      alert(`Message sent to ${student.name} successfully!`);
      setMessageDialog(false);
      setMessageContent('');
    }, 1000);
  };

  // Free video call scheduling (using Calendly-like service)
  const scheduleVideoCall = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // Google Meet integration
    const googleMeetUrl = `https://meet.google.com/new`;
    window.open(googleMeetUrl, '_blank');

    // Alternative: Zoom integration
    // const zoomUrl = `https://zoom.us/start/videomeeting`;
    // window.open(zoomUrl, '_blank');

    setVideoCallDialog(false);
  };

  // WhatsApp messaging integration
  const sendWhatsAppMessage = (studentId: number, message: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // WhatsApp Business API integration
    const phoneNumber = student.phone.replace(/[^\d]/g, ''); // Remove formatting
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {teacherInfo.name}</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Users className="w-4 h-4 mr-1" />
          Teacher
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">My Students</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Tools</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{teacherInfo.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Classes</p>
                    <p className="text-2xl font-bold">{teacherInfo.activeClasses}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                    <p className="text-2xl font-bold">${teacherInfo.monthlyEarnings}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold">{teacherInfo.rating}★</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>Your upcoming classes for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div>
                      <p className="font-medium">Maryam Khan - Little Stars</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                    </div>
                    <Badge variant="outline">Individual</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div>
                      <p className="font-medium">Aisha Ahmed - Young Learners</p>
                      <p className="text-sm text-muted-foreground">10:00 AM - 10:45 AM</p>
                    </div>
                    <Badge variant="outline">Individual</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div>
                      <p className="font-medium">Group Class - Teens</p>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                    <Badge variant="secondary">Group (3)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-1" />
                    <div>
                      <p className="text-sm font-medium">Class completed with Omar Hassan</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-warning mt-1" />
                    <div>
                      <p className="text-sm font-medium">Fee payment pending for Zainab Ali</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-destructive mt-1" />
                    <div>
                      <p className="text-sm font-medium">Maryam Khan missed class</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plus className="w-4 h-4 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">New student enrolled: Yusuf Ibrahim</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  Schedule Class
                </Button>
                <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-20 flex-col">
                      <MessageCircle className="w-6 h-6 mb-2" />
                      Message Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message to Student</DialogTitle>
                      <DialogDescription>
                        Send a message to student or parent via email
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Select Student</Label>
                        <select
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          onChange={(e) => setSelectedStudent(students.find(s => s.id === parseInt(e.target.value)))}
                        >
                          <option value="">Choose student...</option>
                          {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Type your message here..."
                          rows={4}
                        />
                      </div>
                      <Button
                        onClick={() => selectedStudent && sendMessage(selectedStudent.id, messageContent)}
                        className="w-full"
                        disabled={!selectedStudent || !messageContent}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="h-20 flex-col">
                  <BookOpen className="w-6 h-6 mb-2" />
                  Update Progress
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="w-6 h-6 mb-2" />
                  View Earnings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Students</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {selectedStudent ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedStudent.name}</CardTitle>
                    <CardDescription>Age: {selectedStudent.age} • {selectedStudent.course}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                    Back to List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">Student Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Enrollment Date:</span>
                          <span>{selectedStudent.enrollmentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Attended:</span>
                          <span>{selectedStudent.lastAttended}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Class:</span>
                          <span>{selectedStudent.nextClass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{selectedStudent.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span>{selectedStudent.email}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Progress & Performance</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Course Progress</span>
                            <span>{selectedStudent.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${selectedStudent.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance Rate</span>
                            <span className={getAttendanceColor(selectedStudent.attendance)}>
                              {selectedStudent.attendance}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${selectedStudent.attendance >= 90 ? 'bg-success' :
                                selectedStudent.attendance >= 75 ? 'bg-warning' : 'bg-destructive'
                                }`}
                              style={{ width: `${selectedStudent.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">Fee Status</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getFeeStatusColor(selectedStudent.feeStatus) as any}>
                          {selectedStudent.feeStatus}
                        </Badge>
                        {selectedStudent.feeStatus !== 'Paid' && (
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Teacher Notes</h3>
                      <Textarea
                        value={selectedStudent.notes}
                        onChange={(e) => {
                          const updatedStudents = students.map(s =>
                            s.id === selectedStudent.id ? { ...s, notes: e.target.value } : s
                          );
                          setStudents(updatedStudents);
                          setSelectedStudent({ ...selectedStudent, notes: e.target.value });
                        }}
                        rows={4}
                        placeholder="Add notes about student progress, behavior, areas for improvement..."
                      />
                      <Button size="sm" className="mt-2">
                        Save Notes
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => sendWhatsAppMessage(selectedStudent.id, `Hello! This is a message regarding ${selectedStudent.name}'s progress.`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Send WhatsApp Message
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => scheduleVideoCall(selectedStudent.id)}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Start Google Meet
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant="outline" className="text-xs">Age {student.age}</Badge>
                          <Badge variant={getFeeStatusColor(student.feeStatus) as any} className="text-xs">
                            {student.feeStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{student.course}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Progress: {student.progress}%</span>
                          <span className={getAttendanceColor(student.attendance)}>
                            Attendance: {student.attendance}%
                          </span>
                          <span>Next: {student.nextClass}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendWhatsAppMessage(student.id, `Hello! This is a message regarding ${student.name}'s progress.`)}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Teaching Tools Tab */}
        <TabsContent value="teaching" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Teaching Tools</h2>
            <Button>
              <Video className="w-4 h-4 mr-2" />
              Start Live Class
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Interactive Qur'an & Noorani Qaida</CardTitle>
                <CardDescription>Teaching interface for live classes with screen sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="noorani" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="noorani">Noorani Qaida</TabsTrigger>
                    <TabsTrigger value="quran">Qur'an (30 Paras)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="noorani" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Noorani Qaida - Lesson Selection</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Share Screen
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Start Audio
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 17 }, (_, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            className="h-12"
                            onClick={() => setSelectedLesson(i + 1)}
                          >
                            Lesson {i + 1}
                          </Button>
                        ))}
                      </div>

                      <div className="border rounded-lg p-6 bg-muted/20 min-h-96">
                        <div className="text-center">
                          <h4 className="font-semibold mb-4">Lesson 1: Arabic Alphabets</h4>
                          <div className="grid grid-cols-7 gap-4 arabic-text text-3xl">
                            {['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ'].map((letter, index) => (
                              <div
                                key={letter}
                                className="p-4 border rounded-lg cursor-pointer hover:bg-primary/10 hover:scale-110 transition-all duration-200 hover:shadow-lg"
                                onMouseEnter={() => setHoveredLetter(letter)}
                                onMouseLeave={() => setHoveredLetter(null)}
                              >
                                {letter}
                                {hoveredLetter === letter && (
                                  <div className="absolute z-10 mt-2 p-2 bg-primary text-primary-foreground rounded text-sm">
                                    Click to highlight for students
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-4">
                            Hover over letters to highlight them for students during live class
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="quran" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Qur'an - Para Selection</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Share Screen
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Start Audio
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 30 }, (_, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            className="h-12"
                            onClick={() => setSelectedPara(i + 1)}
                          >
                            Para {i + 1}
                          </Button>
                        ))}
                      </div>

                      <div className="border rounded-lg p-6 bg-muted/20 min-h-96">
                        <div className="text-center">
                          <h4 className="font-semibold mb-4">Para 1: Al-Fatiha & Al-Baqarah</h4>
                          <div className="arabic-text text-2xl leading-loose text-right" dir="rtl">
                            <div className="space-y-4">
                              {['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'الرَّحْمَٰنِ الرَّحِيمِ'].map((verse, index) => (
                                <div key={index} className="p-3 border rounded hover:bg-primary/10 cursor-pointer transition-all">
                                  {verse.split(' ').map((word, wordIndex) => (
                                    <span
                                      key={wordIndex}
                                      className="inline-block mx-1 px-2 py-1 rounded hover:bg-primary/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                                      onClick={() => setHighlightedWord(`${index}-${wordIndex}`)}
                                    >
                                      {word}
                                    </span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-4">
                            Click on words to highlight them for students during live class
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Class Controls</CardTitle>
                <CardDescription>Manage your live teaching session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Start Google Meet
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Start Zoom Meeting
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Current Students</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Aisha Ahmed</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Omar Hassan</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Teaching Tools</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Laser Pointer
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Palette className="w-4 h-4 mr-2" />
                        Highlight Tool
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Audio Controls
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button variant="destructive" size="sm" className="w-full">
                      End Class
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Earnings & Payments</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Payment History
              </Button>
              <Button>
                <Banknote className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
            </div>
          </div>

          {/* Payout Explanation */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Banknote className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">About Request Payout</h3>
                  <p className="text-sm text-blue-700">
                    The "Request Payout" button allows you to withdraw your earned money from the platform.
                    You can request payouts weekly (minimum $100) or monthly. Funds are typically transferred
                    to your bank account within 2-3 business days after approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">$2,840</p>
                    <p className="text-xs text-success">+12% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available for Payout</p>
                    <p className="text-2xl font-bold">$2,420</p>
                    <p className="text-xs text-primary">Ready to withdraw</p>
                  </div>
                  <Banknote className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">$420</p>
                    <p className="text-xs text-warning">3 unpaid classes</p>
                  </div>
                  <Clock className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your latest earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">Individual Class - Aisha Ahmed</p>
                      <p className="text-xs text-muted-foreground">Feb 10, 2024</p>
                    </div>
                    <span className="font-semibold text-success">+$18</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">Group Class - Teen Tajweed</p>
                      <p className="text-xs text-muted-foreground">Feb 10, 2024</p>
                    </div>
                    <span className="font-semibold text-success">+$36</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">Individual Class - Omar Hassan</p>
                      <p className="text-xs text-muted-foreground">Feb 9, 2024</p>
                    </div>
                    <span className="font-semibold text-success">+$22</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">Individual Class - Yusuf Ibrahim</p>
                      <p className="text-xs text-muted-foreground">Feb 8, 2024</p>
                    </div>
                    <span className="font-semibold text-success">+$18</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Breakdown by class type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div>
                      <p className="font-medium">Individual Classes</p>
                      <p className="text-sm text-muted-foreground">24 classes this month</p>
                    </div>
                    <span className="font-semibold">$1,920</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                    <div>
                      <p className="font-medium">Group Classes</p>
                      <p className="text-sm text-muted-foreground">16 classes this month</p>
                    </div>
                    <span className="font-semibold">$920</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Total This Month</p>
                      <span className="font-bold text-lg">$2,840</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Payout Options</h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• Weekly payout: Minimum $100</p>
                    <p>• Monthly payout: No minimum</p>
                    <p>• Processing time: 2-3 business days</p>
                    <p>• Payment methods: Bank transfer, PayPal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Free API Integration Info */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Tools</CardTitle>
              <CardDescription>Free APIs integrated for better student communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Email Messaging (EmailJS)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Send direct emails to students and parents using our integrated EmailJS service.
                    Free tier allows 200 emails per month.
                  </p>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Configure Email Settings
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Video className="w-4 h-4 text-secondary" />
                    Video Call Scheduling (Calendly)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule video calls with students using Calendly integration.
                    Free plan includes unlimited 1-on-1 meetings.
                  </p>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Setup Calendly Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
