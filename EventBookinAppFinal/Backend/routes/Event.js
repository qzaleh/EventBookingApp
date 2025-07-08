const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/EventController');

router.post('/create', EventController.createEvent);
router.get('/list', EventController.listEvents);
router.get('/:id', EventController.getEvent);

module.exports = router;
