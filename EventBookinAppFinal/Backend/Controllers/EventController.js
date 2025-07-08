const Event = require('../models/Event');

const createEvent = (req, res, next) => {
    let event = new Event(req.body);
    event.save()
        .then(event => res.json({ message: 'Event created successfully', event }))
        .catch(error => res.json({ error: 'An error occurred while creating the event' }));
};

const listEvents = (req, res, next) => {
    Event.find()
        .then(events => res.json({ events }))
        .catch(error => res.json({ error: 'An error occurred while fetching events' }));
};

const getEvent = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => res.json({ event }))
        .catch(error => res.json({ error: 'An error occurred while fetching the event' }));
};

module.exports = { createEvent, listEvents, getEvent };
