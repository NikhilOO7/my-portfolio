// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');

      // Log the submission in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Contact form submission (Resend not configured):', {
          name,
          email,
          subject: subject || 'No Subject',
          message,
          timestamp: new Date().toISOString(),
        });
      }

      return NextResponse.json(
        { error: 'Email service is not configured. Please contact directly at nikhil.bindal@outlook.com' },
        { status: 503 }
      );
    }

    try {
      // Send email using Resend
      const data = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's free domain
        to: process.env.EMAIL_TO || 'nikhil.bindal@outlook.com',
        replyTo: email,
        subject: `Portfolio Contact: ${subject || 'New message from ' + name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1976FF 0%, #00D4FF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1976FF; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">New Contact Form Submission</h2>
                  <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">From:</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">${subject || 'No Subject'}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">${message.replace(/\n/g, '<br/>')}</div>
                  </div>
                  <div class="footer">
                    <p>This message was sent via your portfolio contact form at ${new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject || 'No Subject'}

Message:
${message}

---
Sent via portfolio contact form at ${new Date().toLocaleString()}
        `.trim(),
      });

      console.log('Email sent successfully:', data);

      // Return success response
      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('Email sending error:', emailError);

      // Log attempt in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Contact form submission (email failed):', {
          name,
          email,
          subject: subject || 'No Subject',
          message,
          error: emailError.message,
          timestamp: new Date().toISOString(),
        });
      }

      // Return failure response
      return NextResponse.json(
        { error: 'Failed to send email. Please try contacting me directly at nikhil.bindal@outlook.com' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}