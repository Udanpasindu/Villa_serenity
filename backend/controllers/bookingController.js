const Booking = require('../models/Booking');
const Room = require('../models/Room');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    // For demo purposes, let's create a mock booking
    const mockBooking = {
      _id: "booking-" + Date.now(),
      user: req.user?.id || "demo-user",
      room: req.body.room,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      guests: req.body.guests,
      specialRequests: req.body.specialRequests,
      totalPrice: 350 * Math.ceil(
        (new Date(req.body.checkOut) - new Date(req.body.checkIn)) / (1000 * 60 * 60 * 24)
      ),
      status: "confirmed",
      createdAt: new Date()
    };
    
    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(201).json({
      success: true,
      data: mockBooking
    });
    
    // Uncomment this for real implementation with database
    /* 
    // Add user ID to request body
    req.body.user = req.user.id;
    
    const { checkIn, checkOut, room: roomId } = req.body;
    
    // Check if room exists
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    // Convert to date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        error: 'Check-in date must be before check-out date'
      });
    }
    
    // Check if room is available for the dates
    const overlappingBookings = await Booking.find({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ]
    });
    
    if (overlappingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Room is not available for the selected dates'
      });
    }
    
    // Calculate total price (number of nights * room price)
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    req.body.totalPrice = nights * room.price;
    
    // Create booking
    const booking = await Booking.create(req.body);
    
    res.status(201).json({
      success: true,
      data: booking
    });
    */
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      success: false,
      error: "Server error when creating booking"
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
exports.getBookings = async (req, res, next) => {
  try {
    let query;
    
    // If regular user, show only their bookings
    if (req.user.role !== 'admin') {
      query = Booking.find({ user: req.user.id });
    } else {
      // If admin, show all bookings
      query = Booking.find();
    }
    
    // Add populate for related data
    const bookings = await query
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'room',
        select: 'name price'
      })
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    // For demo purposes, let's create a mock booking response
    if (req.params.id.startsWith("booking-")) {
      const mockBooking = {
        _id: req.params.id,
        user: {
          _id: "user-123",
          name: "John Doe",
          email: "john@example.com"
        },
        room: {
          name: "Deluxe Ocean Suite",
          price: 350,
          images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        },
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        guests: {
          adults: 2,
          children: 1
        },
        specialRequests: "Late check-in requested",
        totalPrice: 1050,
        status: "confirmed",
        createdAt: new Date().toISOString()
      };
      
      return res.status(200).json({
        success: true,
        data: mockBooking
      });
    }
    
    // If we're here, it means it's not a mock booking ID
    res.status(404).json({
      success: false,
      error: "Booking not found"
    });
    
    // Uncomment for real implementation
    /*
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'room',
        select: 'name price images'
      });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Make sure user owns booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this booking'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
    */
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({
      success: false,
      error: "Server error when fetching booking"
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Make sure user owns booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this booking'
      });
    }
    
    // Prevent changing room, dates, or totalPrice if user is not admin
    if (req.user.role !== 'admin') {
      delete req.body.room;
      delete req.body.checkIn;
      delete req.body.checkOut;
      delete req.body.totalPrice;
      delete req.body.paymentStatus;
      delete req.body.status;
    }
    
    // If admin and changing dates, verify availability
    if (req.user.role === 'admin' && (req.body.checkIn || req.body.checkOut)) {
      const checkInDate = new Date(req.body.checkIn || booking.checkIn);
      const checkOutDate = new Date(req.body.checkOut || booking.checkOut);
      
      // Find overlapping bookings excluding this booking
      const overlappingBookings = await Booking.find({
        _id: { $ne: booking._id },
        room: booking.room,
        status: { $ne: 'cancelled' },
        $or: [
          { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
        ]
      });
      
      if (overlappingBookings.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Room is not available for the selected dates'
        });
      }
      
      // Recalculate total price if dates changed
      const room = await Room.findById(booking.room);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      req.body.totalPrice = nights * room.price;
    }
    
    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Make sure user owns booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to cancel this booking'
      });
    }
    
    // Set booking status to cancelled instead of deleting
    booking.status = 'cancelled';
    await booking.save();
    
    // Notify user about cancellation
    try {
      const user = await User.findById(booking.user);
      const room = await Room.findById(booking.room);
      
      await sendEmail({
        email: user.email,
        subject: 'Booking Cancellation - Villa Serenity',
        message: `
          <h1>Booking Cancellation Notice</h1>
          <p>Dear ${user.name},</p>
          <p>Your booking at Villa Serenity has been cancelled.</p>
          <h2>Booking Details:</h2>
          <ul>
            <li><strong>Room:</strong> ${room.name}</li>
            <li><strong>Check-in:</strong> ${booking.checkIn.toLocaleDateString()}</li>
            <li><strong>Check-out:</strong> ${booking.checkOut.toLocaleDateString()}</li>
          </ul>
          <p>If you did not request this cancellation, please contact our customer service.</p>
        `
      });
    } catch (err) {
      console.log('Email could not be sent', err);
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};
