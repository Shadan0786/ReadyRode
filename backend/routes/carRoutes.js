const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/admin");
const carController = require("../controllers/carController.js");

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Admin only routes
router.post('/add', auth, adminAuth, carController.addCar);
router.put('/:id', auth, adminAuth, carController.updateCar);
router.delete('/:id', auth, adminAuth, carController.deleteCar);

module.exports = router;