const { Cart } = require('../../db');

const getCarts_h = async (props) => {
    try {
        const carts = await Cart.findAll(props);

        if (!carts || carts.length === 0) return { error: 'Carritos no encontrados' };
    
        return carts;
    } catch (error) {
        return error.message;
    }
};

module.exports = { getCarts_h };