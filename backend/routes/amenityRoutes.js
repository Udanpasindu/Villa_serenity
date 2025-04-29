const express = require('express');
const router = express.Router();
const { 
  getAmenities, 
  getAmenity, 
  createAmenity, 
  updateAmenity, 
  deleteAmenity 
} = require('../controllers/amenityController');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(getAmenities)
  .post(protect, authorize('admin'), createAmenity);

router.route('/:id')
  .get(getAmenity)
  .put(protect, authorize('admin'), updateAmenity)
  .delete(protect, authorize('admin'), deleteAmenity);

module.exports = router;
