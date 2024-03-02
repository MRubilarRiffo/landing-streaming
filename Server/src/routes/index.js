const { Router } = require('express');
const productsRoutes = require('./productsRoute');
const mercadopagoRoutes = require('./mercadopagoRoute');
const binancepayRoutes = require('./binancepayRoute');
const reviewsRoutes = require('./reviewsRoute');

const router = Router();

router.use('/products', productsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/mercadopago', mercadopagoRoutes);
router.use('/binancepay', binancepayRoutes);

module.exports = router;