const { Cart } = require('../../db');

const createCart_h = async (product, user, quantity, amount) => {
    try {
        const cart = await Cart.create({ quantity, amount });

        await user.setCart(cart);
        await cart.addProduct(product);

        return cart;
    } catch (error) {
        return error.message;
    }
};

module.exports = { createCart_h };