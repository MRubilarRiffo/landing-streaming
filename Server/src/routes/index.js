const { Router } = require('express');
const productsRoutes = require('./productsRoute');
const mercadopagoRoutes = require('./mercadopagoRoute');

const router = Router();

router.use('/products', productsRoutes);
router.use('/mercadopago', mercadopagoRoutes);

module.exports = router;