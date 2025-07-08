const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type:String
    },
    description: {
        type:String
    },
    date: {
        type:Date
    },
    location: {
        type:String
    },
    ticketsAvailable: {
        type:Number
    },
    ticketPrice: {
        type:Number
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
