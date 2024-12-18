import mongoose from 'mongoose';
import dotenv from 'dotenv';
import initializeDB from '../database/initializeDB.js';

dotenv.config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB already connected.");
    return;
  }
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personal-social-records');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // After successful connection, call initializeDB to set up collections
    await initializeDB();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;