const mongoose = require("mongoose");

/**
 * Connects the backend server to MongoDB database.
 * This function uses the MONGO_URI value from the .env file.
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;