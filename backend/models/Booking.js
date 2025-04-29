const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Please add check-in date']
  },
  checkOut: {
    type: Date,
    required: [true, 'Please add check-out date']
  },
  guests: {
    adults: {
      type: Number,
      required: [true, 'Please add number of adult guests'],
      default: 1
    },
    children: {
      type: Number,
      default: 0
    }
  },
  specialRequests: {
    type: String,
    maxlength: [300, 'Special requests cannot be more than 300 characters']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index on checkIn and checkOut to allow efficient availability checks
BookingSchema.index({ checkIn: 1, checkOut: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
