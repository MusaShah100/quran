import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, Calendar as CalendarIcon, Download, AlertCircle, CreditCard, BarChart3, Eye } from 'lucide-react';

type FeeRecord = {
    id: number;
    studentName: string;
    teacherName: string;
    course: string;
    amount: number;
    dueDate: string;
    paidDate: string | null;
    status: string;
    paymentMethod: string | null;
    proofUrl: string | null;
};

type PaymentForm = {
    studentId: string;
    amount: number;
    paymentDate: Date;
    paymentMethod: string;
    notes: string;
};

export function AnalyticsFeesTab({
    monthlyRevenue,
    feeStatusData,
    courseRevenue,
    newPayment,
    setNewPayment,
    feeRecords,
    onAddPayment,
    onMarkAsPaid,
    getFeeStatusColor,
}: {
    monthlyRevenue: { month: string; revenue: number; students: number }[];
    feeStatusData: { name: string; value: number; color: string }[];
    courseRevenue: { course: string; revenue: number }[];
    newPayment: PaymentForm;
    setNewPayment: React.Dispatch<React.SetStateAction<PaymentForm>>;
    feeRecords: FeeRecord[];
    onAddPayment: () => void;
    onMarkAsPaid: (recordId: number, paymentMethod: string, proofFile?: File) => void;
    getFeeStatusColor: (status: string) => string;
}) {
    const [dialogPaymentMethod, setDialogPaymentMethod] = useState('Cash');
    const [dialogProofFile, setDialogProofFile] = useState<File | undefined>(undefined);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Fee Management</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue Trend</CardTitle>
                        <CardDescription>Revenue and student growth over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Fee Payment Status</CardTitle>
                        <CardDescription>Current payment status distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={feeStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {feeStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Revenue by Course Category</CardTitle>
                    <CardDescription>Monthly revenue breakdown by course type</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={courseRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="course" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#f37b1a" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Record Payment</CardTitle>
                        <CardDescription>Mark student fee as paid</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="student-select">Select Student</Label>
                            <select
                                id="student-select"
                                value={newPayment.studentId}
                                onChange={(e) => setNewPayment({ ...newPayment, studentId: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md bg-background"
                            >
                                <option value="">Choose student...</option>
                                {feeRecords.filter(r => r.status !== 'Paid').map((record) => (
                                    <option key={record.id} value={record.id.toString()}>
                                        {record.studentName} - ${record.amount}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="payment-date">Payment Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newPayment.paymentDate ? format(newPayment.paymentDate, 'PPP') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={newPayment.paymentDate}
                                        onSelect={(date) => date && setNewPayment({ ...newPayment, paymentDate: date })}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="payment-method">Payment Method</Label>
                            <select
                                id="payment-method"
                                value={newPayment.paymentMethod}
                                onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md bg-background"
                            >
                                <option value="Cash">Cash</option>
                                <option value="Online">Online Transfer</option>
                                <option value="Card">Credit/Debit Card</option>
                                <option value="Check">Check</option>
                            </select>
                        </div>

                        {newPayment.paymentMethod === 'Online' && (
                            <div>
                                <Label htmlFor="payment-proof">Upload Payment Proof</Label>
                                <Input id="payment-proof" type="file" accept="image/*,.pdf" className="cursor-pointer" />
                            </div>
                        )}

                        <div>
                            <Label htmlFor="payment-notes">Notes (Optional)</Label>
                            <Textarea
                                id="payment-notes"
                                value={newPayment.notes}
                                onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                                placeholder="Additional notes about the payment..."
                                rows={2}
                            />
                        </div>

                        <Button onClick={onAddPayment} className="w-full" disabled={!newPayment.studentId}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Record Payment
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Fee Summary</CardTitle>
                        <CardDescription>Current month overview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Paid</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">
                                    ${feeRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.amount, 0)}
                                </p>
                                <p className="text-xs text-green-600">
                                    {feeRecords.filter(r => r.status === 'Paid').length} students
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-600" />
                                <span className="font-medium">Pending</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-yellow-600">
                                    ${feeRecords.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0)}
                                </p>
                                <p className="text-xs text-yellow-600">
                                    {feeRecords.filter(r => r.status === 'Pending').length} students
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-600" />
                                <span className="font-medium">Overdue</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-600">
                                    ${feeRecords.filter(r => r.status === 'Overdue').reduce((sum, r) => sum + r.amount, 0)}
                                </p>
                                <p className="text-xs text-red-600">
                                    {feeRecords.filter(r => r.status === 'Overdue').length} students
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Total Expected</span>
                                <span className="font-bold text-lg">${feeRecords.reduce((sum, r) => sum + r.amount, 0)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Fee management tools</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export Fee Report
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Send Overdue Reminders
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Generate Invoices
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Monthly Report
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Fee Records</CardTitle>
                    <CardDescription>Complete list of student fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {feeRecords.map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold">{record.studentName}</h3>
                                        <Badge variant={getFeeStatusColor(record.status) as any}>{record.status}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{record.course}</p>
                                    <p className="text-sm text-muted-foreground">Teacher: {record.teacherName}</p>
                                    <div className="flex gap-4 mt-2 text-sm">
                                        <span>Amount: ${record.amount}</span>
                                        <span>Due: {record.dueDate}</span>
                                        {record.paidDate && <span>Paid: {record.paidDate}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {record.status !== 'Paid' && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Mark Paid
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Mark as Paid</DialogTitle>
                                                    <DialogDescription>Record payment for {record.studentName}</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Payment Method</Label>
                                                        <select
                                                            className="w-full px-3 py-2 border rounded-md bg-background"
                                                            value={dialogPaymentMethod}
                                                            onChange={(e) => setDialogPaymentMethod(e.target.value)}
                                                        >
                                                            <option value="Cash">Cash</option>
                                                            <option value="Online">Online Transfer</option>
                                                            <option value="Card">Credit/Debit Card</option>
                                                        </select>
                                                    </div>
                                                    {dialogPaymentMethod === 'Online' && (
                                                        <div>
                                                            <Label>Upload Proof (if online payment)</Label>
                                                            <Input
                                                                type="file"
                                                                accept="image/*,.pdf"
                                                                onChange={(e) => setDialogProofFile(e.target.files?.[0])}
                                                            />
                                                        </div>
                                                    )}
                                                    <Button
                                                        onClick={() => onMarkAsPaid(record.id, dialogPaymentMethod, dialogProofFile)}
                                                        className="w-full"
                                                    >
                                                        Confirm Payment
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                    {record.proofUrl && (
                                        <Button size="sm" variant="outline">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

