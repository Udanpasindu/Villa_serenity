const express = require('express');
const router = express.Router();
const { 
  getRooms, 
  getRoom, 
  createRoom, 
  updateRoom, 
  deleteRoom,
  checkAvailability
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.route('/')
  .get(getRooms)
  .post(protect, authorize('admin'), upload.array('images', 10), createRoom);

router.route('/:id')
  .get(getRoom)
  .put(protect, authorize('admin'), upload.array('images', 10), updateRoom)
  .delete(protect, authorize('admin'), deleteRoom);

router.post('/check-availability', checkAvailability);

module.exports = router;
