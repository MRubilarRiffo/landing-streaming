const productsRoutes = require('express').Router();

const { getProducts } = require('../controllers/products/getProducts');
const { createProducts } = require('../controllers/products/createProducts');
const { getProductById } = require('../controllers/products/getProductById');

productsRoutes.get('/', getProducts);
productsRoutes.get('/:id', getProductById);
productsRoutes.post('/', createProducts);

module.exports = productsRoutes;