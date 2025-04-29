// src/backend/services/emailService.ts
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a transporter using environment variables
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'bindalnikhil09@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD, // App password should be stored in environment variables
      },
    });
  }

  /**
   * Send email 
   */
  async sendContactEmail(data: EmailData): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'bindalnikhil09@gmail.com',
        to: process.env.EMAIL_TO || 'nikhil.bindal@outlook.com',
        replyTo: data.email,
        subject: `Portfolio Contact: ${data.subject || 'New message'}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || 'No Subject'}</p>
          <hr />
          <div>
            <p>${data.message.replace(/\n/g, '<br/>')}</p>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}

// Create and export a single instance
const emailService = new EmailService();
export default emailService;