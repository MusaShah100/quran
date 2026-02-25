'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { SettingsSection } from './components/SettingsSection';
import { DashboardTab } from './components/DashboardTab';
import { TeachersTab } from './components/TeachersTab';
import { CoursesTab } from './components/CoursesTab';
import { VideosTab } from './components/VideosTab';
import { AnalyticsFeesTab } from './components/AnalyticsFeesTab';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');


  // Mock data for analytics
  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      studentName: 'Aisha Ahmed',
      teacherName: 'Sister Fatima Rahman',
      course: 'Tajweed for Young Learners',
      amount: 120,
      dueDate: '2024-02-15',
      paidDate: '2024-02-14',
      status: 'Paid',
      paymentMethod: 'Online',
      proofUrl: '/receipts/aisha-feb-2024.jpg'
    },
    {
      id: 2,
      studentName: 'Omar Hassan',
      teacherName: 'Ustadh Ahmed Al-Mahmoud',
      course: 'Tajweed for Teens',
      amount: 150,
      dueDate: '2024-02-15',
      paidDate: null,
      status: 'Pending',
      paymentMethod: null,
      proofUrl: null
    },
    {
      id: 3,
      studentName: 'Zainab Ali',
      teacherName: 'Sister Fatima Rahman',
      course: 'Advanced Tajweed',
      amount: 180,
      dueDate: '2024-02-10',
      paidDate: null,
      status: 'Overdue',
      paymentMethod: null,
      proofUrl: null
    },
    {
      id: 4,
      studentName: 'Yusuf Ibrahim',
      teacherName: 'Ustadh Omar Hassan',
      course: 'Hifz Program',
      amount: 200,
      dueDate: '2024-02-15',
      paidDate: '2024-02-13',
      status: 'Paid',
      paymentMethod: 'Cash',
      proofUrl: null
    },
    {
      id: 5,
      studentName: 'Maryam Khan',
      teacherName: 'Sister Aisha Malik',
      course: 'Little Stars Tajweed',
      amount: 100,
      dueDate: '2024-02-20',
      paidDate: null,
      status: 'Pending',
      paymentMethod: null,
      proofUrl: null
    }
  ]);

  // Chart data
  const monthlyRevenue = [
    { month: 'Oct', revenue: 8500, students: 45 },
    { month: 'Nov', revenue: 9200, students: 52 },
    { month: 'Dec', revenue: 10800, students: 58 },
    { month: 'Jan', revenue: 12450, students: 67 },
    { month: 'Feb', revenue: 11200, students: 63 }
  ];

  const feeStatusData = [
    { name: 'Paid', value: feeRecords.filter(r => r.status === 'Paid').length, color: '#22c55e' },
    { name: 'Pending', value: feeRecords.filter(r => r.status === 'Pending').length, color: '#f59e0b' },
    { name: 'Overdue', value: feeRecords.filter(r => r.status === 'Overdue').length, color: '#ef4444' }
  ];

  const courseRevenue = [
    { course: 'Tajweed Classes', revenue: 6800 },
    { course: 'Hifz Program', revenue: 3200 },
    { course: 'Tafseer Classes', revenue: 2450 }
  ];

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Ustadh Ahmed Al-Mahmoud',
      email: 'ahmed@miftahquran.com',
      specialties: ['Tajweed', 'Hifz'],
      students: 45,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sister Fatima Rahman',
      email: 'fatima@miftahquran.com',
      specialties: ['Tajweed', 'Children'],
      students: 32,
      status: 'Active'
    }
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Tajweed for Little Stars (4-7 years)',
      category: 'Tajweed',
      ageGroup: '4-7 years',
      instructor: 'Sister Aisha Malik',
      students: 28,
      price: { individual: 15, group: 8 },
      status: 'Active'
    },
    {
      id: 2,
      title: 'Hifz Program for Children',
      category: 'Hifz',
      ageGroup: '8-15 years',
      instructor: 'Ustadh Omar Hassan',
      students: 15,
      price: { individual: 35, group: 20 },
      status: 'Active'
    }
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Amazing Progress - 7-Year-Old Sarah',
      category: 'Tajweed',
      duration: '4:32',
      views: 1250,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Teen Hifz Champion Journey',
      category: 'Hifz',
      duration: '8:45',
      views: 2100,
      status: 'Published'
    }
  ]);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: '',
    experience: '',
    education: '',
    bio: '',
    hourlyRate: { individual: 0, group: 0 }
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Tajweed',
    ageGroup: '4-7 years',
    description: '',
    duration: '',
    sessionsPerWeek: 2,
    sessionDuration: '30 minutes',
    instructor: '',
    price: { individual: 0, group: 0 },
    features: ''
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'Tajweed',
    ageGroup: '4-7 years',
    instructor: '',
    tags: ''
  });

  const [newPayment, setNewPayment] = useState({
    studentId: '',
    amount: 0,
    paymentDate: new Date(),
    paymentMethod: 'Cash',
    notes: ''
  });

  const handleAddTeacher = () => {
    const teacher = {
      id: teachers.length + 1,
      ...newTeacher,
      specialties: newTeacher.specialties.split(',').map(s => s.trim()),
      students: 0,
      status: 'Active'
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      specialties: '',
      experience: '',
      education: '',
      bio: '',
      hourlyRate: { individual: 0, group: 0 }
    });
  };

  const handleAddCourse = () => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      features: newCourse.features.split(',').map(f => f.trim()),
      students: 0,
      status: 'Active'
    };
    setCourses([...courses, course]);
    setNewCourse({
      title: '',
      category: 'Tajweed',
      ageGroup: '4-7 years',
      description: '',
      duration: '',
      sessionsPerWeek: 2,
      sessionDuration: '30 minutes',
      instructor: '',
      price: { individual: 0, group: 0 },
      features: ''
    });
  };

  const handleAddVideo = () => {
    const video = {
      id: videos.length + 1,
      ...newVideo,
      tags: newVideo.tags.split(',').map(t => t.trim()),
      duration: '0:00',
      views: 0,
      status: 'Draft'
    };
    setVideos([...videos, video]);
    setNewVideo({
      title: '',
      description: '',
      category: 'Tajweed',
      ageGroup: '4-7 years',
      instructor: '',
      tags: ''
    });
  };

  const handleMarkAsPaid = (recordId: number, paymentMethod: string, proofFile?: File) => {
    setFeeRecords(prev => prev.map(record =>
      record.id === recordId
        ? {
          ...record,
          status: 'Paid',
          paidDate: format(new Date(), 'yyyy-MM-dd'),
          paymentMethod,
          proofUrl: proofFile ? `/receipts/${proofFile.name}` : null
        }
        : record
    ));
  };

  const handleAddPayment = () => {
    const selectedRecord = feeRecords.find(r => r.id === parseInt(newPayment.studentId));
    if (selectedRecord) {
      handleMarkAsPaid(selectedRecord.id, newPayment.paymentMethod);
      setNewPayment({
        studentId: '',
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: 'Cash',
        notes: ''
      });
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="container py-6">
      <SettingsSection />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Fees</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <DashboardTab teachers={teachers} courses={courses} videos={videos} />
        </TabsContent>

        {/* Teachers Tab */}
        <TabsContent value="teachers" className="space-y-6">
          <TeachersTab
            teachers={teachers}
            newTeacher={newTeacher}
            setNewTeacher={setNewTeacher}
            onAddTeacher={handleAddTeacher}
          />
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <CoursesTab
            courses={courses}
            newCourse={newCourse}
            setNewCourse={setNewCourse}
            onAddCourse={handleAddCourse}
          />
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <VideosTab
            videos={videos}
            newVideo={newVideo}
            setNewVideo={setNewVideo}
            onAddVideo={handleAddVideo}
          />
        </TabsContent>

        {/* Analytics & Fees Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsFeesTab
            monthlyRevenue={monthlyRevenue}
            feeStatusData={feeStatusData}
            courseRevenue={courseRevenue}
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            feeRecords={feeRecords}
            onAddPayment={handleAddPayment}
            onMarkAsPaid={handleMarkAsPaid}
            getFeeStatusColor={getFeeStatusColor}
          />
        </TabsContent>
      </Tabs>
    </div >
  );
}
