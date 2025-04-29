const express = require('express');
const router = express.Router();
const { 
  getTestimonials, 
  getTestimonial, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.route('/')
  .get(getTestimonials)
  .post(protect, upload.single('image'), createTestimonial);

router.route('/:id')
  .get(getTestimonial)
  .put(protect, authorize('admin'), upload.single('image'), updateTestimonial)
  .delete(protect, authorize('admin'), deleteTestimonial);

module.exports = router;
