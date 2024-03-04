const { Cart } = require('../../db');

const getTotalCarts = async (props) => {
    try {
        const totalCarts = await Cart.count(props);

        return totalCarts;
    } catch (error) {
        return error;
    };
};

module.exports = { getTotalCarts };