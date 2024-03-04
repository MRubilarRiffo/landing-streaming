const { Cart } = require('../../db');

const createCart_h = async (props) => {
    try {
        const cart = await Cart.create(props);

        if (!cart || cart.length === 0) return { error: 'Error al crear carrito' };

        return cart;
    } catch (error) {
        return error.message;
    }
};

module.exports = { createCart_h };