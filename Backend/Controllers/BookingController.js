const Booking = require('../models/Booking');
const Event = require('../models/Event');

const createBooking = async (req, res, next) => {
    try {
        let event = await Event.findById(req.body.eventId);
        if (event.ticketsAvailable < req.body.seats) {
            return res.json({ error: 'Not enough tickets available' });
        }
        
        let booking = new Booking({
            user: req.body.userId,
            event: req.body.eventId,
            seats: req.body.seats,
            totalPrice: event.ticketPrice * req.body.seats
        });
        
        await booking.save();
        
        event.ticketsAvailable -= req.body.seats;
        await event.save();
        
        res.json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.json({ error: 'An error occurred while creating the booking' });
    }
};

const listBookings = (req, res, next) => {
    Booking.find({ user: req.body.userId })
        .populate('event')
        .then(bookings => res.json({ bookings }))
        .catch(error => res.json({ error: 'An error occurred while fetching bookings' }));
};

module.exports = { createBooking, listBookings };
