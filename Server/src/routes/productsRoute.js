const productsRoutes = require('express').Router();

const { getProducts } = require('../controllers/products/getProducts');
const { createProducts } = require('../controllers/products/createProducts');

productsRoutes.get('/', getProducts);
productsRoutes.post('/', createProducts);

module.exports = productsRoutes;