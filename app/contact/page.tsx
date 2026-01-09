'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.contact.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.contact.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Google Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.contact.register.title}</CardTitle>
              <CardDescription>
                {t.contact.register.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf6DqFQCzYmghum11P1NgwCGP-qSXxVj4Wd7lQzKJYVpvIbcw/viewform?embedded=true"
                  width="100%"
                  height="1456"
                >
                  {t.common.loading}
                </iframe>
              </div>
            </CardContent>
          </Card>

          {/* Quick Help */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t.contact.quickHelp.title}</CardTitle>
              <CardDescription>
                {t.contact.quickHelp.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {t.contact.quickHelp.technical.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t.contact.quickHelp.technical.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {t.contact.quickHelp.course.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t.contact.quickHelp.course.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {t.contact.quickHelp.teacher.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t.contact.quickHelp.teacher.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {t.contact.quickHelp.partnership.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t.contact.quickHelp.partnership.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.contact.contactInfo.title}</CardTitle>
              <CardDescription>
                {t.contact.contactInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t.contact.contactInfo.email}</p>
                  <p className="text-sm text-muted-foreground">learn@quranlearn.com</p>
                  <p className="text-sm text-muted-foreground">support@quranlearn.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t.contact.contactInfo.phone}</p>
                  <p className="text-sm text-muted-foreground">+92 (111) 123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{t.contact.contactInfo.liveChat}</p>
                  <p className="text-sm text-muted-foreground">{t.contact.contactInfo.available}</p>
                  <p className="text-xs text-muted-foreground">{t.contact.contactInfo.automated}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.contact.officeHours.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.contact.officeHours.mondayFriday}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.contact.officeHours.saturday}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.contact.officeHours.sunday}</span>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  {t.contact.officeHours.response}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.contact.alternative.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.contact.alternative.whatsapp}</span>
                <Badge variant="outline">{t.contact.alternative.available}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.contact.alternative.telegram}</span>
                <Badge variant="outline">{t.contact.alternative.join}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.contact.alternative.faq}</span>
                <Badge variant="outline">{t.contact.alternative.browse}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
}
