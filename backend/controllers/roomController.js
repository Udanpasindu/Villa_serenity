const Room = require('../models/Room');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new room
// @route   POST /api/rooms
// @access  Private (Admin)
exports.createRoom = async (req, res, next) => {
  try {
    // Add images from file upload if they exist
    if (req.files) {
      let imageFiles = [];
      
      if (!Array.isArray(req.files.images)) {
        imageFiles = [req.files.images];
      } else {
        imageFiles = req.files.images;
      }
      
      const imageFileNames = imageFiles.map(file => file.filename);
      req.body.images = imageFileNames;
    }
    
    const room = await Room.create(req.body);
    
    res.status(201).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private (Admin)
exports.updateRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Handle image uploads if they exist
    if (req.files) {
      let imageFiles = [];
      
      if (!Array.isArray(req.files.images)) {
        imageFiles = [req.files.images];
      } else {
        imageFiles = req.files.images;
      }
      
      const imageFileNames = imageFiles.map(file => file.filename);
      req.body.images = [...room.images, ...imageFileNames];
    }
    
    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: room
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private (Admin)
exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Check if room has active bookings
    const activeBookings = await Booking.find({
      room: room._id,
      status: { $ne: 'cancelled' },
      checkOut: { $gt: new Date() }
    });
    
    if (activeBookings.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete room with active bookings'
      });
    }
    
    await room.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Check room availability
// @route   POST /api/rooms/check-availability
// @access  Public
exports.checkAvailability = async (req, res, next) => {
  try {
    const { checkIn, checkOut, roomId } = req.body;
    console.log("Checking availability for room:", roomId);
    
    // More flexible approach for handling both MongoDB ObjectIds and simple IDs
    let query;
    if (mongoose.Types.ObjectId.isValid(roomId)) {
      // If it's a valid ObjectId, use it directly
      query = { room: mongoose.Types.ObjectId(roomId) };
    } else {
      // For mock data with simple IDs, use string comparison (development only)
      // In production, you should always validate for proper ObjectIds
      console.log("Using string ID for development:", roomId);
      query = { room: roomId };
    }
    
    // Convert to date objects
    let checkInDate, checkOutDate;
    try {
      checkInDate = new Date(checkIn);
      checkOutDate = new Date(checkOut);
      
      // Validate dates are valid
      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        throw new Error('Invalid date format');
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
        isAvailable: false
      });
    }
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        error: 'Check-in date must be before check-out date',
        isAvailable: false
      });
    }
    
    // For development with mock data, always return available
    // Comment out this section in production
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      res.status(200).json({
        success: true,
        isAvailable: true,
        message: "Room is available for the selected dates (development mode)"
      });
      return;
    }
    
    // Find overlapping bookings with proper query
    const overlappingBookings = await Booking.find({
      ...query,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ]
    });
    
    const isAvailable = overlappingBookings.length === 0;
    
    res.status(200).json({
      success: true,
      isAvailable,
      message: isAvailable ? "Room is available for the selected dates" : "Room is not available for the selected dates"
    });
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({
      success: false,
      error: 'Server error when checking availability: ' + err.message,
      isAvailable: false
    });
  }
};
