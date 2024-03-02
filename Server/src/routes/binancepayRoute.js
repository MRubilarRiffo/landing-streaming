const binancepayRoutes = require('express').Router();

const { binancePay } = require('../controllers/payment methods/Binance Pay/binancePay');
const { queryOrder } = require('../controllers/payment methods/Binance Pay/queryOrder');

binancepayRoutes.post('/process_payment', binancePay);
binancepayRoutes.post('/queryOrder', queryOrder);

module.exports = binancepayRoutes;