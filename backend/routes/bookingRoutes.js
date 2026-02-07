const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin');
const bookingController = require('../controllers/bookingController');

// IMPORTANT: Booking model ko yahan import karna zaroori hai
const Booking = require('../models/Booking'); 

// Routes
router.post('/', auth, bookingController.createBooking);
router.get('/user/:userId', auth, bookingController.getUserBookings);
router.get('/admin/all', auth, adminAuth, bookingController.getAllBookingsAdmin);

// Cancel a booking
router.delete('/:id', auth, async (req, res) => {
    try {
        // 1. Check karein ki booking exist karti hai ya nahi
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking record not found' });
        }

        // 2. Check karein ki kya ye booking usi user ki hai?
        // req.user.id 'auth' middleware se aata hai
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to cancel this booking' });
        }

        // 3. Booking ko delete karein
        await Booking.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Booking cancelled successfully' });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

module.exports = router;