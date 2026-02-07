const Car = require('../models/Car');

// @desc    Get all cars with optional filters (category, availability)
// @route   GET /api/cars
exports.getAllCars = async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;

    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a single car's details
// @route   GET /api/cars/:id
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format", error: error.message });
  }
};

// @desc    Add a new car (Admin Only)
// @route   POST /api/cars/add
exports.addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Car added to fleet successfully!", savedCar });
  } catch (error) {
    res.status(400).json({ message: "Failed to add car", error: error.message });
  }
};

// @desc    Update car details (Admin Only)
// @route   PUT /api/cars/:id
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// @desc    Delete a car (Admin Only)
// @route   DELETE /api/cars/:id
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car removed from system" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};