const { Product } = require('../../db');

const createProducts_h = async (name, description, previousPrice, salePrice, slug) => {
    try {
        const createProduct = await Product.create({
            name,
            description,
            previousPrice,
            salePrice,
            slug,
        });

        return createProduct;
    } catch (error) {
        return error.message;
    };
};

module.exports = { createProducts_h };