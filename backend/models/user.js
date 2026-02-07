const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, "First name is required"], 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: [true, "Last name is required"], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: 8 
  },
  phoneNumber: { 
    type: String, 
    required: [true, "Phone number is required"] 
  },

  role: { 
    type: String, 
    enum: ['customer', 'admin', 'employee'], 
    default: 'customer' 
  },
  profileImage: { type: String }, 
  
  
  totalRentals: { type: Number, default: 0 },
  
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);