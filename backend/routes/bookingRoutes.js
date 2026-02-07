const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin');
const bookingController = require('../controllers/bookingController');

// Routes
router.post('/', auth, bookingController.createBooking);
router.get('/user/:userId', auth, bookingController.getUserBookings);
router.get('/admin/all', auth, adminAuth, bookingController.getAllBookingsAdmin);

module.exports = router;