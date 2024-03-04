const { Cart, Product } = require('../../db');

const getCartByUserId_h = async (userId) => {
    try {
        const cart = await Cart.findOne({ where: userId, include: Product }); //quitar include

        if (!cart) return { error: 'Carrito no encontrado' };
        
        return cart;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getCartByUserId_h };