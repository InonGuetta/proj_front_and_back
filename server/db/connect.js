import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (mongoose.connection.readyState >= 1) return;
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'soldiers_complaints_db',
});
}
