const reviewsRoutes = require('express').Router();

const { getReviewsByProduct } = require('../controllers/reviews/getReviewsByProduct');

reviewsRoutes.get('/:id', getReviewsByProduct);

module.exports = reviewsRoutes;