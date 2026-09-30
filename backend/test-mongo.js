const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Testing connection to:', uri);
    await mongoose.connect(uri);
    console.log('Connected successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Connection Error:', err.message);
    process.exit(1);
  }
}
test();
