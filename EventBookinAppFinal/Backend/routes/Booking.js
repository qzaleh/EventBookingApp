const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/BookingController');

router.post('/create', BookingController.createBooking);
router.get('/list', BookingController.listBookings);

module.exports = router;
