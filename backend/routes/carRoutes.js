const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/admin")
const carController = require("../controllers/carController.js")



// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Admin only routes
router.post('/add', auth, adminAuth, carController.addCar);
router.put('/:id', auth, adminAuth, carController.updateCar);
router.delete('/:id', auth, adminAuth, carController.deleteCar);


// Get all available cars
router.get('/available', async (req, res) => {
  try {
    const cars = await Car.find({ status: 'Available' });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Admin: Add a new car to the fleet
router.post('/add', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Only admins can add cars
router.post('/add', auth, adminAuth, carController.addCar);



module.exports = router;