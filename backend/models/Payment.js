const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['Credit Card', 'PayPal', 'Stripe', 'Cash'], 
    required: true 
  },
  transactionId: { type: String, unique: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Success', 'Failed', 'Refunded'], 
    default: 'Pending' 
  },
  paidAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);