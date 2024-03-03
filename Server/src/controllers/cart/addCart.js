const { createCart_h } = require('../../handlers/cart/addCart_h');
const { getProductById_h } = require('../../handlers/products/getProductById_h');
const { getUserById_h } = require('../../handlers/user/getUserById_h');

const addCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;

        if (!productId || !userId || !quantity) {
            return res.status(400).json({ error: 'Faltan datos' });
        };

        const user = await getUserById_h(userId);

        if (user.error) {
            return res.status(400).send(user.error);
        };

        const product = await getProductById_h(productId);

        if (product.error) {
            return res.status(400).send(product.error);
        };

        let variablePrice = null;

        if (product.bulkPrice) {
            const bulkPrice = JSON.parse(product.bulkPrice) || [];

            const matchedRule = bulkPrice.find(({ min = 1, max = Infinity}) => quantity >= min && quantity <= max);

            if (matchedRule) {
                variablePrice = (product.priceOffert - matchedRule.discount);
            };
        };

        const amount = quantity * variablePrice || product.priceOffert;

        const cart = await createCart_h(product, user, quantity, amount);

        if (cart.error) {
            return res.status(400).send(cart.error);
        } else {
            return res.json({ data: cart });
        };
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

module.exports = { addCart };