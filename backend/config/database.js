const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Database connection error type:', error.name);
    console.error('❌ Error message:', error.message);

    if (error.message.includes('MongooseServerSelectionError') || error.name === 'MongooseServerSelectionError') {
      console.error('DATABASE CONNECTION ERROR: Your IP address may not be whitelisted in MongoDB Atlas.');
      console.error('Please go to MongoDB Atlas -> Network Access -> Add Current IP Address.');
      console.error('Falling back to local MongoDB...');
      
      try {
        // Fallback to local MongoDB
        const localConn = await mongoose.connect('mongodb://localhost:27017/halesi-herbal-local');
        console.log(`Connected to local MongoDB: ${localConn.connection.host}`);
        return localConn;
      } catch (localError) {
        console.error('Local MongoDB also failed. Please ensure MongoDB is running locally.');
        console.error('You can install MongoDB locally or start it with: mongod');
        throw localError;
      }
    } else {
      console.error('Database connection error:', error.message);
      throw error;
    }
  }
};

module.exports = connectDB;
