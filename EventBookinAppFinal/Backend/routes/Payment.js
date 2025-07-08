const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/PaymentController');

router.post('/process', PaymentController.processPayment);

module.exports = router;
