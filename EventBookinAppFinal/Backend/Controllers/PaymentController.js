const stripe = require('stripe')('your-stripe-secret-key');
const Booking = require('../models/Booking');

const processPayment = async (req, res, next) => {
    const { bookingId, token } = req.body;

    try {
        let booking = await Booking.findById(bookingId).populate('event');
        const charge = await stripe.charges.create({
            amount: booking.totalPrice * 100, // amount in cents
            currency: 'usd',
            source: token,
            description: `Booking for event ${booking.event.name}`
        });

        booking.paymentStatus = 'Paid';
        await booking.save();

        res.json({ message: 'Payment successful', charge });
    } catch (error) {
        res.json({ error: 'An error occurred while processing the payment' });
    }
};

module.exports = { processPayment };
