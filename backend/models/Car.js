const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true }, 
  model: { type: String, required: true }, 
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true, unique: true },
  image: { type: String, default: "https://via.placeholder.com/300x200?text=No+Image" },
  category: { 
    type: String, 
    enum: ['Economy', 'Luxury', 'SUV', 'Electric'], 
    required: true 
  },
  pricePerDay: { type: Number, required: true },
  transmission: { type: String, enum: ['Manual', 'Automatic'], default: 'Automatic' },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
  features: [String], // e.g., ["GPS", "Sunroof", "Bluetooth"]
  status: { 
    type: String, 
    enum: ['Available', 'Rented', 'Maintenance'], 
    default: 'Available' 
  },
  image: { type: String }, 
  currentLocation: { type: String } 
});

module.exports = mongoose.model('Car', carSchema);