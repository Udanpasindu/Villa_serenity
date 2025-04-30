const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const path = require('path');
const mongoose = require('mongoose');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Upload directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/amenities', require('./routes/amenityRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));

// Test DB Route - Diagnostic Purpose
app.get('/api/test-db', async (req, res) => {
  try {
    // Check if users collection exists and count documents
    const usersCollection = mongoose.connection.db.collection('users');
    const count = await usersCollection.countDocuments();
    
    res.json({
      success: true,
      database: mongoose.connection.name,
      collections: await mongoose.connection.db.listCollections().toArray(),
      userCount: count
    });
  } catch (err) {
    console.error('Test DB Error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  // Add some startup info
  console.log('----------------------------------------');
  console.log('API Routes:');
  console.log('- Auth: POST /api/auth/register, POST /api/auth/login');
  console.log('- Users: GET /api/auth/me (Protected)');
  console.log('----------------------------------------');
});
