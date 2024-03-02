const mercadopagoRoutes = require('express').Router();

const { mercado_Pago } = require('../controllers/payment methods/Mercado Pago/mercadoPago');

mercadopagoRoutes.post('/process_payment', mercado_Pago);

module.exports = mercadopagoRoutes;