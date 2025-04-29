const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const path = require('path');

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

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
