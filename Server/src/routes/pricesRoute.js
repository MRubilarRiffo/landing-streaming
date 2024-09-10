const pricesRoutes = require('express').Router();

const calculateTotal = require('../controllers/prices/calculateTotal');

pricesRoutes.post('/calculate-total', calculateTotal);

module.exports = pricesRoutes;