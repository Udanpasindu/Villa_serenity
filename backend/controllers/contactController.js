const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send auto-reply to user
    try {
      await sendEmail({
        email: req.body.email,
        subject: 'Thank You for Contacting Villa Serenity',
        message: `
          <h1>Thank You for Contacting Villa Serenity</h1>
          <p>Dear ${req.body.name},</p>
          <p>We have received your inquiry and will get back to you shortly.</p>
          <p>Your message reference number is: ${contact._id}</p>
          <p>Best regards,</p>
          <p>The Villa Serenity Team</p>
        `
      });
      
      // Notify admin about new contact submission
      await sendEmail({
        email: process.env.EMAIL_FROM,
        subject: 'New Contact Form Submission',
        message: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Message:</strong> ${req.body.message}</p>
          <p><strong>Reference ID:</strong> ${contact._id}</p>
        `
      });
    } catch (err) {
      console.log('Email could not be sent', err);
    }
    
    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
exports.getContactSubmissions = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private (Admin)
exports.getContactSubmission = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }
    
    // Update status to read if it was new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update contact submission status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
exports.updateContactSubmission = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};
