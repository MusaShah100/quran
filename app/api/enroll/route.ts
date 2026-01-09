import { NextResponse } from 'next/server';
import { sendEnrollmentEmails, type EnrollmentData } from '@/lib/email';

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data: EnrollmentData = await req.json();
    
    // Validate required fields
    if (!data.personal?.email || !data.personal?.fullName || !data.courseId || !data.plan) {
      console.error('Missing required fields:', {
        hasEmail: !!data.personal?.email,
        hasFullName: !!data.personal?.fullName,
        hasCourseId: !!data.courseId,
        hasPlan: !!data.plan,
      });
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Enrollment submission received:', {
      name: data.personal.fullName,
      email: data.personal.email,
      course: data.courseId,
      plan: data.plan,
    });

    // Try to send emails, but don't fail the submission if emails fail
    let emailResult: Awaited<ReturnType<typeof sendEnrollmentEmails>> = { success: false, error: 'Not attempted' };
    try {
      emailResult = await sendEnrollmentEmails(data);
      if (!emailResult.success) {
        console.error('Failed to send emails:', emailResult.error ?? 'Unknown email error');
        console.log('Continuing with enrollment submission despite email failure');
      }
    } catch (emailError) {
      console.error('Email sending threw an error:', emailError);
      // Continue with submission even if email fails
      emailResult = { 
        success: false, 
        error: emailError instanceof Error ? emailError.message : 'Unknown email error' 
      };
    }

    // Always return success for the enrollment submission
    // Email failures are logged but don't prevent enrollment
    return NextResponse.json({ 
      ok: true, 
      message: 'Enrollment submitted successfully',
      emailsSent: emailResult.success 
    });
  } catch (e) {
    console.error('Enrollment API error:', e);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 400 }
    );
  }
}
