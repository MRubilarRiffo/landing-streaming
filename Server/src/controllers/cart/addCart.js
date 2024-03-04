const { addProduct } = require('../../handlers/cart/addProduct');
const { createCart_h } = require('../../handlers/cart/createCart_h');
const { getProductById_h } = require('../../handlers/products/getProductById_h');
const { getUserById_h } = require('../../handlers/user/getUserById_h');
const { getCartByUserId_h } = require('../../handlers/cart/getCartByUserId_h');
const { updateCart } = require('../../handlers/cart/updateCart');

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

        let amount = quantity * variablePrice || product.priceOffert;
        
        let cart = await getCartByUserId_h(userId);
        
        if (cart.error) {
            const props = { UserId: userId, amount };
            cart = await createCart_h(props);
            if (cart.error) {
                return res.status(400).send(cart.error);
            };
        };
        
        const props = { through: { quantity } };
        
        const result = await addProduct(cart, product, props);
        
        if (result.error) {
            return res.status(400).send(result.error);
        };

        amount = amount + cart.amount;
        const updateAmount = await updateCart({ where: { id: cart.id } }, { amount });

        return res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

module.exports = { addCart };