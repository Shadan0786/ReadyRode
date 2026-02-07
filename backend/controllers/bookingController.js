const Booking = require('../models/Booking');
const Car = require('../models/Car');

// @desc    Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { car, startDate, endDate, pickupLocation } = req.body;
        const userId = req.user.id;

        const carData = await Car.findById(car);
        if (!carData) return res.status(404).json({ msg: "Car not found" });

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) return res.status(400).json({ msg: "End date must be after start date" });

        // Overlap Check
        const overlapping = await Booking.findOne({
            car,
            $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }]
        });

        if (overlapping) return res.status(400).json({ msg: "Car is already booked for these dates" });

        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = days * carData.pricePerDay;

        const booking = new Booking({
            car, user: userId, startDate, endDate, pickupLocation, totalPrice, status: "Confirmed"
        });

        await booking.save();
        res.status(201).json({ message: "Booking confirmed!", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get bookings for a specific user (Used in profile.html)
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('car');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get all bookings for Admin (Used in admin.html)
exports.getAllBookingsAdmin = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'firstName lastName').populate('car', 'make model');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};