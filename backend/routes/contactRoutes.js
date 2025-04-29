const express = require('express');
const router = express.Router();
const { 
  submitContactForm, 
  getContactSubmissions, 
  getContactSubmission, 
  updateContactSubmission 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route for submission
router.post('/', submitContactForm);

// Admin routes - protected
router.get('/', protect, authorize('admin'), getContactSubmissions);
router.route('/:id')
  .get(protect, authorize('admin'), getContactSubmission)
  .put(protect, authorize('admin'), updateContactSubmission);

module.exports = router;
