import mongoose from 'mongoose';

export let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/master_export_pro';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (err) {
    isMongoConnected = false;
    console.log(`[MongoDB] Notice: Could not connect to MongoDB at ${uri} (${err.message})`);
    console.log(`[MongoDB] Falling back to robust in-memory datastore for active MERN API services.`);
    return false;
  }
}
