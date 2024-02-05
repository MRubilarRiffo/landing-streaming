const { Router } = require('express');
const productsRoutes = require('./productsRoute');
const mercadopagoRoutes = require('./mercadopagoRoute');
const reviewsRoutes = require('./reviewsRoute');

const router = Router();

router.use('/products', productsRoutes);
router.use('/mercadopago', mercadopagoRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;