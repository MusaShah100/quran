# Email Configuration Setup

This guide explains how to configure email functionality for enrollment confirmations.

## Overview

When a user completes the enrollment form, the system automatically sends:
1. **Confirmation email** to the user with their enrollment details
2. **Notification email** to the admin with the new enrollment information

## Setup Instructions

### 1. Create Environment Variables File

Create a `.env.local` file in the root of your project (this file is already in `.gitignore` and won't be committed).

### 2. Configure SMTP Settings

Add the following environment variables to `.env.local`:

```env
# SMTP Server Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password-or-smtp-password
SMTP_FROM=noreply@miftahquran.com

# Admin Email - Where enrollment notifications will be sent
ADMIN_EMAIL=admin@miftahquran.com
```

### 3. Gmail Setup (Recommended for Development)

If you're using Gmail:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Miftah Quran" as the name
   - Copy the generated 16-character password
3. **Use the App Password** as your `SMTP_PASSWORD` (not your regular Gmail password)

### 4. Other Email Services

For production, consider using dedicated email services:

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
```

#### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-access-key-id
SMTP_PASSWORD=your-aws-secret-access-key
```

## Testing

After configuring your environment variables:

1. Restart your Next.js development server (`npm run dev`)
2. Complete an enrollment form submission
3. Check both:
   - User's email inbox for confirmation
   - Admin email inbox for notification

## Troubleshooting

### Emails not sending?

1. **Check environment variables**: Make sure `.env.local` exists and has all required variables
2. **Verify SMTP credentials**: Test your SMTP settings with an email client first
3. **Check server logs**: Look for error messages in your terminal/console
4. **Gmail specific**: Ensure you're using an App Password, not your regular password
5. **Firewall/Network**: Some networks block SMTP ports (587, 465)

### Common Errors

- **"Invalid login"**: Check your SMTP_USER and SMTP_PASSWORD
- **"Connection timeout"**: Verify SMTP_HOST and SMTP_PORT are correct
- **"Authentication failed"**: For Gmail, make sure 2FA is enabled and you're using an App Password

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Use environment-specific credentials for production
- Consider using a dedicated email service for production (SendGrid, Mailgun, AWS SES)
- Rotate passwords/API keys regularly

