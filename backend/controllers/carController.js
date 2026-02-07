const Car = require('../models/Car');

// @desc    Get all cars with optional filters (category, status)
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
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car", error: error.message });
  }
};

// @desc    Add a new car (Admin Only)
exports.addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Car added successfully!", savedCar });
  } catch (error) {
    res.status(400).json({ message: "Failed to add car", error: error.message });
  }
};

// @desc    Update car details (Admin Only)
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
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car removed from system" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};