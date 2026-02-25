import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Settings } from 'lucide-react';

export function SettingsSection() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Settings</CardTitle>
                                <CardDescription>Configure core platform settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform-name">Platform Name</Label>
                                    <Input id="platform-name" defaultValue="Miftah Quran" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Admin Email</Label>
                                    <Input id="admin-email" type="email" defaultValue="admin@miftahquran.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support-phone">Support Phone</Label>
                                    <Input id="support-phone" defaultValue="+1 (555) 123-4567" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Default Timezone</Label>
                                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                                        <option value="UTC">UTC</option>
                                        <option value="EST">Eastern Time</option>
                                        <option value="PST">Pacific Time</option>
                                        <option value="GMT">Greenwich Mean Time</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        <p className="text-muted-foreground">Manage your Qur'an learning platform</p>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Settings</CardTitle>
                                <CardDescription>Configure payment and pricing options</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Default Currency</Label>
                                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                        <option value="CAD">CAD - Canadian Dollar</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trial-days">Free Trial Days</Label>
                                    <Input id="trial-days" type="number" defaultValue="3" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="commission">Platform Commission (%)</Label>
                                    <Input id="commission" type="number" defaultValue="15" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="min-payout">Minimum Payout Amount</Label>
                                    <Input id="min-payout" type="number" defaultValue="100" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Communication Settings</CardTitle>
                                <CardDescription>Configure messaging and notification settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                                    <Input id="whatsapp-number" placeholder="+1234567890" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="facebook-page">Facebook Page ID</Label>
                                    <Input id="facebook-page" placeholder="your-page-id" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-service">Email Service Provider</Label>
                                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                                        <option value="emailjs">EmailJS</option>
                                        <option value="sendgrid">SendGrid</option>
                                        <option value="mailgun">Mailgun</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="enable-chat" defaultChecked />
                                    <Label htmlFor="enable-chat">Enable Live Chat Widget</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Configure security and access controls</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="two-factor" />
                                    <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="login-attempts" defaultChecked />
                                    <Label htmlFor="login-attempts">Limit Login Attempts</Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                    <Input id="session-timeout" type="number" defaultValue="60" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="backup-frequency">Data Backup Frequency</Label>
                                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Settings className="w-4 h-4 mr-1" />
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline">Reset to Defaults</Button>
                        <Button>Save Settings</Button>
                    </div>
                    Administrator
                </div>
            </div>
        </div>
    );
}

