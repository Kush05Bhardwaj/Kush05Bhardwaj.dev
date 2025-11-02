const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/emailQueue');
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: 'Too many contact form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

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

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter, async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not ready. Please try again in a moment.'
      });
    }

    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { name, email, subject, message } = value;

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    // Send emails via queue
    try {
      // Send notification to admin
      await sendEmail('contactForm', {
        name,
        email,
        subject,
        message,
      });

      // Send auto-reply to user
      await sendEmail('autoReply', {
        name,
        email,
        subject,
        message,
      });

      // Update contact status
      contact.status = 'sent';
      contact.emailSent = true;
      contact.autoReplySent = true;
      await contact.save();

      res.status(200).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        }
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      
      // Still save the contact but mark as failed
      contact.status = 'failed';
      await contact.save();

      // Return success to user but log the email error
      res.status(200).json({
        success: true,
        message: 'Your message has been saved. We will get back to you soon.',
        data: {
          id: contact._id,
          name: contact.name,
        }
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (Admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    // Mark as read
    if (contact.status === 'sent') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message'
    });
  }
});

module.exports = router;
