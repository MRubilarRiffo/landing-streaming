const { Product, ProductVariation, Variation } = require('../../db');

const getProductById_h = async (productId) => {
    try {
        const product = await Product.findByPk(productId, {
            include: {
                model: Variation,
                include: [ProductVariation],
            },
        });

        if (!product) return { error: 'Producto no encontrado' };
        
        return product;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getProductById_h };