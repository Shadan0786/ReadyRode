const Booking = require('../models/Booking');
const Car = require('../models/Car');

exports.createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate, pickupLocation } = req.body;
    const userId = req.user.id;

    // 1. Check car exists
    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({ msg: "Car not found" });
    }

    // 2. Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({ msg: "End date must be after start date" });
    }

    // 3. Check overlapping bookings
    const overlappingBooking = await Booking.findOne({
      car,
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({
        msg: "Car is already booked for these dates"
      });
    }

    // 4. Calculate total price
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * carData.pricePerDay;

    // 5. Create booking
    const booking = new Booking({
      car,
      user: userId,
      startDate,
      endDate,
      pickupLocation,
      totalPrice,
      status: "Confirmed"
    });

    await booking.save();

    res.status(201).json({
      message: "Booking confirmed!",
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
