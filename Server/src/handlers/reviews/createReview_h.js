const { Review } = require('../../db');
const { calculateAverageRating } = require('./calculateAverageRating');

const createReview_h = async (content, rating, productId) => {
    try {
        const createReview = await Review.create({
            content: content,
            rating: rating,
            ProductId: productId
        });

        await calculateAverageRating(productId);

        return createReview;
    } catch (error) {
        return error.message;
    };
};

module.exports = { createReview_h };