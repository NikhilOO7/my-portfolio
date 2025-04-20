import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

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

    // For development, we'll log the message to console
    // In production, you would send this via email or to a database
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp: new Date().toISOString(),
    });
    
    // Try to send to the backend server if in production
    if (process.env.NODE_ENV === 'production' && process.env.BACKEND_URL) {
      try {
        await axios.post(`${process.env.BACKEND_URL}/api/contact`, {
          name,
          email,
          subject: subject || 'Contact Form Submission',
          message,
        });
      } catch (error) {
        console.error('Error forwarding to backend:', error);
        // We'll still return success to the client
        // But in a real app, you might want to handle this differently
      }
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}