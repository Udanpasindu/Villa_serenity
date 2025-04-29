const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookings, 
  getBooking, 
  updateBooking, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, cancelBooking);

module.exports = router;
