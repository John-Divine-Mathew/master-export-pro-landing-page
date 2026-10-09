import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  enquiryRef: {
    type: String,
    required: true,
    unique: true,
    default: () => `ENQ-${Math.floor(1000 + Math.random() * 9000)}`
  },
  buyerName: {
    type: String,
    required: [true, 'Buyer name is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true,
    default: 'Global'
  },
  productCategory: {
    type: String,
    trim: true,
    default: 'Valves & Actuators'
  },
  quantity: {
    type: Number,
    default: 100
  },
  targetPrice: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['New Enquiry', 'Under Review', 'Quotation Prepared', 'Confirmed Order', 'Closed'],
    default: 'New Enquiry'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
