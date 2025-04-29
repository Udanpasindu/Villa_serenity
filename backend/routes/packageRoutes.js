const express = require('express');
const router = express.Router();
const { 
  getPackages, 
  getPackage, 
  createPackage, 
  updatePackage, 
  deletePackage 
} = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.route('/')
  .get(getPackages)
  .post(protect, authorize('admin'), upload.single('image'), createPackage);

router.route('/:id')
  .get(getPackage)
  .put(protect, authorize('admin'), upload.single('image'), updatePackage)
  .delete(protect, authorize('admin'), deletePackage);

module.exports = router;
