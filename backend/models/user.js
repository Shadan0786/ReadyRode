const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  phoneNumber: { type: String, required: true },
  driversLicense: { type: String }, // Missing field added
  role: { type: String, enum: ['customer', 'admin', 'employee'], default: 'customer' },
  totalRentals: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);