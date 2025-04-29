// src/backend/routes/contact.ts
import { Router, Request, Response } from "express";
import emailService from "../services/emailService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required fields' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            });
        }
        
        // Send email
        const emailSent = await emailService.sendContactEmail({
            name,
            email,
            subject: subject || 'Contact Form Submission',
            message
        });
        
        if (emailSent) {
            return res.status(200).json({ 
                success: true, 
                message: 'Your message has been sent successfully!' 
            });
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Contact API error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'An error occurred while sending your message. Please try again later.' 
        });
    }
});

export default router;