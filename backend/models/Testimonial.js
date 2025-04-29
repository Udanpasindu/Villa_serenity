const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
    maxlength: [500, 'Testimonial cannot be more than 500 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add author name']
  },
  position: {
    type: String,
    required: [true, 'Please add author position or location']
  },
  image: {
    type: String,
    default: 'default-avatar.jpg'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
