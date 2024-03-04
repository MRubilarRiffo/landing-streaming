const cartRoutes = require('express').Router();

const { addCart } = require('../controllers/cart/addCart');
const { getCarts } = require('../controllers/cart/getCarts');
const { updateCart } = require('../controllers/cart/updateCart');

cartRoutes.post('/addcart', addCart);
cartRoutes.get('/getCart', getCarts);
cartRoutes.put('/updateCart', updateCart);

module.exports = cartRoutes;