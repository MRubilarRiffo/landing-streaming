const mercadopagoRoutes = require('express').Router();

const { mercado_Pago } = require('../controllers/mercado pago/mercadoPago');

mercadopagoRoutes.post('/process_payment', mercado_Pago);

module.exports = mercadopagoRoutes;