const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin');
const bookingController = require('../controllers/bookingController');
const Booking = require('../models/Booking');

// Create booking
router.post('/', auth, bookingController.createBooking);

// User booking history
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const bookings = await Booking
      .find({ user: req.params.userId })
      .populate('car');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin – see all bookings
router.get('/admin/all', auth, adminAuth, async (req, res) => {
  const bookings = await Booking
    .find()
    .populate('user')
    .populate('car');

  res.json(bookings);
});

module.exports = router;
