// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create transport with Gmail and App Password
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      service: "Outlook365",
      auth: {
        user: process.env.EMAIL_USER || 'nikhil.bindal@outlook.com',
        pass: process.env.EMAIL_APP_PASSWORD, // Use environment variable
      },
    });

    // Configure email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'nikhil.bindal@outlook.com'}>`,
      to: process.env.EMAIL_TO || 'nikhil.bindal@outlook.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New message'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <hr />
        <div>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent:', info.messageId);
      
      // Return success response
      return NextResponse.json(
        { success: true, message: 'Message received' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Log attempt in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Contact form submission (email failed):', {
          name,
          email,
          subject: subject || 'No Subject',
          message,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Return failure response
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
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