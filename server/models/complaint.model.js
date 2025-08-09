import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['food', 'equipment', 'orders', 'other'],
      required: true,
      trim: true,
    },
    message: { type: String, required: true, trim: true, minlength: 2 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Complaint =
  mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);
