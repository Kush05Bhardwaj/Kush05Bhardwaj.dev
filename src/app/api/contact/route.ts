import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendEmail, emailTemplates } from '@/lib/email';
import Joi from 'joi';

// Force Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Rate limiting - simple in-memory store (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // 3 requests per window

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (userLimit.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      message: 'Too many contact form submissions. Please try again later.',
    };
  }

  userLimit.count += 1;
  return { allowed: true };
}

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),
  subject: Joi.string().trim().min(5).max(200).required().messages({
    'string.empty': 'Subject is required',
    'string.min': 'Subject must be at least 5 characters',
    'string.max': 'Subject cannot exceed 200 characters',
  }),
  message: Joi.string().trim().min(10).max(2000).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters',
    'string.max': 'Message cannot exceed 2000 characters',
  }),
});

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: rateLimitCheck.message,
        },
        { status: 429 }
      );
    }

    // Connect to database
    await connectDB();

    // Parse and validate request body
    const body = await request.json();
    console.log('📧 Contact form data received:', body);
    
    const { error, value } = contactSchema.validate(body, { abortEarly: false });

    if (error) {
      console.error('❌ Validation failed:', error.details);
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }
    
    console.log('✅ Validation passed, creating contact...');

    // Create contact record
    const contact = await Contact.create({
      ...value,
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    console.log('✅ Contact saved, sending emails...');

    // Send emails (await to ensure they send on Vercel)
    try {
      await Promise.all([
        // Send notification email to you
        sendEmail(emailTemplates.contactForm(value))
          .then(() => {
            console.log('✅ Notification email sent successfully');
            contact.emailSent = true;
            contact.status = 'sent';
            return contact.save();
          })
          .catch((err) => {
            console.error('❌ Failed to send notification email:', err.message);
            contact.status = 'failed';
            return contact.save();
          }),
        
        // Send auto-reply to user
        sendEmail(emailTemplates.autoReply(value))
          .then(() => {
            console.log('✅ Auto-reply email sent successfully');
            contact.autoReplySent = true;
            return contact.save();
          })
          .catch((err) => {
            console.error('❌ Failed to send auto-reply email:', err.message);
          }),
      ]);
    } catch (err) {
      console.error('❌ Email sending error:', err);
    }

    console.log('✅ All operations completed');

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit contact form. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get all contacts (for admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query: any = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contacts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
