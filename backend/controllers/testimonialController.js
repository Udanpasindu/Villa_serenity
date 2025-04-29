const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by featured if query parameter exists
    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }
    
    const testimonials = await Testimonial.find(query).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private
exports.createTestimonial = async (req, res, next) => {
  try {
    // If user is not admin, add their user ID
    if (req.user.role !== 'admin') {
      req.body.user = req.user.id;
    }
    
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    const testimonial = await Testimonial.create(req.body);
    
    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
exports.updateTestimonial = async (req, res, next) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }
    
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }
    
    await testimonial.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
