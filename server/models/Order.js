import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  buyer: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  destinationPort: {
    type: String,
    default: 'Rotterdam Port'
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Shipment', 'Invoice due', 'Paid'],
    default: 'Confirmed'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  items: [
    {
      product: String,
      qty: Number,
      unitPrice: Number,
      amount: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
