const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    event: { 
        type: Schema.Types.ObjectId, ref: 'Event' 
    },
    seats: {
        type: Number
    },
    totalPrice: {
        type:Number
    },
    paymentStatus: { 
        type: String, default: 'Pending' 
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
