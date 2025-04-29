const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  icon: {
    type: String,
    required: [true, 'Please add an icon name']
  },
  title: {
    type: String,
    required: [true, 'Please add amenity title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Amenity', AmenitySchema);
