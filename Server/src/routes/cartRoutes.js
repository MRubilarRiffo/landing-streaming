const cartRoutes = require('express').Router();

const { addCart } = require('../controllers/cart/addCart');

cartRoutes.post('/addcart', addCart);

module.exports = cartRoutes;