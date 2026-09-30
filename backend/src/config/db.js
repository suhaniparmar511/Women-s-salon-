const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error('Error: MONGODB_URI is not defined in .env environment file.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error for ${mongoURI}: ${error.message}`);
    console.error(`Please verify your MongoDB URI and ensure your IP address is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.`);
    process.exit(1);
  }
};

module.exports = connectDB;
