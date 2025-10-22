const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    
    // List collections to verify database access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`Available collections: ${collections.map(c => c.name).join(', ')}`);

    // Check if users collection exists, create it if not
    if (!collections.some(c => c.name === 'users')) {
      console.log('Users collection not found, it will be created when the first user registers');
    }

    return conn;
  } catch (error) {
    // Print full error (stack) for diagnostics
    console.error('MongoDB connection error:');
    console.error(error && error.stack ? error.stack : error);

    // Redact credentials before printing the URI if available
    try {
      const raw = process.env.MONGO_URI || '';
      const redacted = raw.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1<user>:<password>@');
      console.error('Used MONGO_URI (redacted):', redacted);
    } catch (e) {
      // ignore
    }

    console.error('Please check your MongoDB connection string and network settings');
    process.exit(1);
  }
};

module.exports = connectDB;
