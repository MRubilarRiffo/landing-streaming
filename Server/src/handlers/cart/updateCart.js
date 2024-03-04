const { Cart } = require('../../db');

const updateCart = async (where, props) => {
    try {
        const result = await Cart.update(props, where);

        return result;
    } catch (error) {
        return error.message;
    };
};

module.exports = { updateCart };