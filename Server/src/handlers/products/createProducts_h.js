const { Product } = require('../../db');

const createProducts_h = async (name, description, price, priceOffert, slug) => {
    try {
        const createProduct = await Product.create({
            name,
            description,
            price,
            priceOffert,
            slug,
        });

        return createProduct;
    } catch (error) {
        return error.message;
    };
};

module.exports = { createProducts_h };