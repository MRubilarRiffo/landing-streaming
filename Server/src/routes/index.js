const { Router } = require('express');
const productsRoutes = require('./productsRoute');
const mercadopagoRoutes = require('./mercadopagoRoute');
const binancepayRoutes = require('./binancepayRoute');
const reviewsRoutes = require('./reviewsRoute');
const cartRoutes = require('./cartRoutes');
const userRoutes = require('./userRoutes');

const router = Router();

router.use('/products', productsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/mercadopago', mercadopagoRoutes);
router.use('/binancepay', binancepayRoutes);
router.use('/cart', cartRoutes);
router.use('/user', userRoutes);

module.exports = router;