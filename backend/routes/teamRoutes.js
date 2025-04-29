const express = require('express');
const router = express.Router();
const { 
  getTeamMembers, 
  getTeamMember, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.route('/')
  .get(getTeamMembers)
  .post(protect, authorize('admin'), upload.single('image'), createTeamMember);

router.route('/:id')
  .get(getTeamMember)
  .put(protect, authorize('admin'), upload.single('image'), updateTeamMember)
  .delete(protect, authorize('admin'), deleteTeamMember);

module.exports = router;
