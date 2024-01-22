const { Sequelize } = require('sequelize');
const { Review } = require('../../db');
const { updateProducts_h } = require('../products/updateProducts_h');

const calculateAverageRating = async (productId) => {
    try {
        const result = await Review.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
            ],
            where: {
                ProductId: productId
            },
            raw: true
        });
        
        const update = { averageRating: result.averageRating || 0 };

        return await updateProducts_h(productId, update);
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { calculateAverageRating };