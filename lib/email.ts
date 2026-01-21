import nodemailer from 'nodemailer';

// Email transporter configuration
// Uses environment variables for SMTP settings
const createTransporter = () => {
  // For development, you can use Gmail, SendGrid, Mailgun, or any SMTP service
  // For production, use a proper email service like SendGrid, AWS SES, etc.

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true'; // true for 465, false for other ports

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Add timeout and connection options to prevent hanging
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

export interface EnrollmentData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    language: string;
    age: string;
  };
  courseId: string;
  plan: string;
  pricingType: 'fixed' | 'income';
  fixedFee: number | null;
  monthlyIncome: number | null;
  charity: number | null;
  currency: string;
  totalMonthlyUSD: number;
  totalInCurrency: number;
  bonusDuaIncluded: boolean;
  isTrial?: boolean;
}

const courseNames: Record<string, string> = {
  'quran-reading': "Qur'an Reading (Beginner)",
  'tajweed': 'Tajweed (Correct Recitation)',
  'hifz': "Qur'an Memorization (Hifz)",
  'kids': "Children's Qur'an Learning",
};

const planNames: Record<string, string> = {
  'base': 'Base Plan',
  'intermediate': 'Intermediate Plan',
  'premium': 'Premium Plan',
};

// User confirmation email template
const getUserConfirmationEmail = (data: EnrollmentData): { subject: string; html: string } => {
  const courseName = courseNames[data.courseId] || data.courseId;
  const planName = planNames[data.plan] || data.plan;
  const feeType = data.pricingType === 'fixed' ? 'Fixed Price' : 'Income-Based';
  const monthlyFee = data.pricingType === 'fixed'
    ? `${data.fixedFee} ${data.currency}`
    : `${data.monthlyIncome ? (data.monthlyIncome * 0.025).toFixed(2) : 0} ${data.currency}`;
  const charityAmount = data.charity ? `${data.charity} ${data.currency}` : 'None';
  const totalAmount = `${data.totalInCurrency} ${data.currency}`;

  return {
    subject: `Enrollment Confirmation - ${courseName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enrollment Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Enrollment Confirmation</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              Assalamu Alaikum <strong>${data.personal.fullName}</strong>,
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for enrolling in our course! We have received your enrollment details and are excited to have you join us.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h2 style="color: #059669; margin-top: 0; font-size: 20px;">Your Enrollment Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Full Name:</td>
                  <td style="padding: 8px 0;">${data.personal.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;">${data.personal.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;">${data.personal.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Country:</td>
                  <td style="padding: 8px 0;">${data.personal.country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Preferred Language:</td>
                  <td style="padding: 8px 0;">${data.personal.language}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Age Range:</td>
                  <td style="padding: 8px 0;">${data.personal.age}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Selected Course:</td>
                  <td style="padding: 8px 0;">${courseName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Selected Plan:</td>
                  <td style="padding: 8px 0;">${planName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Fee Type:</td>
                  <td style="padding: 8px 0;">${feeType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Monthly Fee:</td>
                  <td style="padding: 8px 0;">${monthlyFee}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Charity Donation:</td>
                  <td style="padding: 8px 0;">${charityAmount}</td>
                </tr>
                <tr style="background: #f0fdf4; border-top: 2px solid #10b981;">
                  <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total Monthly Amount:</td>
                  <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #059669;">${totalAmount}</td>
                </tr>
              </table>
            </div>
            
            ${data.bonusDuaIncluded ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;">
                <strong>🎁 Bonus:</strong> Free Duas Course is included with your enrollment!
              </p>
            </div>
            ` : ''}
            
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af;">
                <strong>📅 Next Steps:</strong> Our team will contact you within 24 hours to discuss class timings and finalize your enrollment. Please keep an eye on your email and phone.
              </p>
            </div>
            
            <p style="font-size: 16px; margin-top: 30px;">
              If you have any questions or need to make changes to your enrollment, please don't hesitate to contact us.
            </p>
            
            <p style="font-size: 16px; margin-top: 20px;">
              JazakAllah Khair for choosing us for your Qur'an learning journey.
            </p>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              Best regards,<br>
              <strong>The QuranLearn Team</strong><br>
              Email: support@quranlearn.com<br>
              Phone: +92 (111) 123-4567
            </p>
          </div>
        </body>
      </html>
    `,
  };
};

// Admin notification email template
const getAdminNotificationEmail = (data: EnrollmentData): { subject: string; html: string } => {
  const courseName = courseNames[data.courseId] || data.courseId;
  const planName = planNames[data.plan] || data.plan;
  const feeType = data.pricingType === 'fixed' ? 'Fixed Price' : 'Income-Based';
  const monthlyFee = data.pricingType === 'fixed'
    ? `${data.fixedFee} ${data.currency}`
    : `${data.monthlyIncome ? (data.monthlyIncome * 0.025).toFixed(2) : 0} ${data.currency}`;
  const charityAmount = data.charity ? `${data.charity} ${data.currency}` : 'None';
  const totalAmount = `${data.totalInCurrency} ${data.currency}`;
  const subjectPrefix = data.isTrial ? '[FREE TRIAL REQUEST] ' : '';

  return {
    subject: `${subjectPrefix}New Enrollment: ${data.personal.fullName} - ${courseName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Enrollment Notification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">${data.isTrial ? 'Free Trial Request' : 'New Enrollment Received'}</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            ${data.isTrial ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-weight: bold; font-size: 16px;">
                🎯 This user has requested a Free Trial Class.
              </p>
            </div>
            ` : ''}
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              A new enrollment has been submitted. Please review the details below:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">Enrollment Information</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Full Name:</td>
                  <td style="padding: 8px 0;">${data.personal.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${data.personal.email}">${data.personal.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${data.personal.phone}">${data.personal.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Country:</td>
                  <td style="padding: 8px 0;">${data.personal.country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Preferred Language:</td>
                  <td style="padding: 8px 0;">${data.personal.language}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Age Range:</td>
                  <td style="padding: 8px 0;">${data.personal.age}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Selected Course:</td>
                  <td style="padding: 8px 0;"><strong>${courseName}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Selected Plan:</td>
                  <td style="padding: 8px 0;">${planName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Fee Type:</td>
                  <td style="padding: 8px 0;">${feeType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Monthly Fee:</td>
                  <td style="padding: 8px 0;">${monthlyFee}</td>
                </tr>
                ${data.pricingType === 'income' && data.monthlyIncome ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Monthly Income:</td>
                  <td style="padding: 8px 0;">${data.monthlyIncome} ${data.currency}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Charity Donation:</td>
                  <td style="padding: 8px 0;">${charityAmount}</td>
                </tr>
                <tr style="background: #eff6ff; border-top: 2px solid #3b82f6;">
                  <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total Monthly Amount:</td>
                  <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #2563eb;">${totalAmount}</td>
                </tr>
                <tr style="background: #eff6ff;">
                  <td style="padding: 8px 0; font-weight: bold;">Total Monthly (USD):</td>
                  <td style="padding: 8px 0; font-weight: bold;">$${data.totalMonthlyUSD.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            
            ${data.bonusDuaIncluded ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;">
                <strong>Note:</strong> Bonus Duas Course is included with this enrollment.
              </p>
            </div>
            ` : ''}
            
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <p style="margin: 0; color: #991b1b;">
                <strong>Action Required:</strong> Please contact the student within 24 hours to discuss class timings and finalize the enrollment.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              This is an automated notification from the enrollment system.
            </p>
          </div>
        </body>
      </html>
    `,
  };
};

// Send email function
export async function sendEnrollmentEmails(data: EnrollmentData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required environment variables first
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('SMTP credentials not configured - skipping email sending');
      console.warn('Please configure SMTP_USER and SMTP_PASSWORD in .env.local');
      return { success: false, error: 'Email service not configured' };
    }

    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@quranlearn.com';
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@quranlearn.com';

    // Send confirmation email to user
    const userEmail = getUserConfirmationEmail(data);
    await transporter.sendMail({
      from: `"QuranLearn" <${fromEmail}>`,
      to: data.personal.email,
      subject: userEmail.subject,
      html: userEmail.html,
    });

    // Send notification email to admin
    const adminEmailContent = getAdminNotificationEmail(data);
    await transporter.sendMail({
      from: `"QuranLearn Enrollment System" <${fromEmail}>`,
      to: adminEmail,
      subject: adminEmailContent.subject,
      html: adminEmailContent.html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

