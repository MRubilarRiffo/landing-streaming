const { addProduct } = require("../../handlers/cart/addProduct");
const { getCartByUserId_h } = require("../../handlers/cart/getCartByUserId_h");
const { getProductById_h } = require("../../handlers/products/getProductById_h");
const { getUserById_h } = require("../../handlers/user/getUserById_h");

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const [user, product] = await Promise.all([
            getUserById_h(userId),
            getProductById_h(productId)
        ]);

        if (!user || !product) {
            return res.status(404).json({ error: 'Usuario o producto no encontrado' });
        };

        const cart = await getCartByUserId_h(userId);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        };

        const props = {
            through: { quantity },
            update: true
        };

        const result = await addProduct(cart, product, props);

        if (result.error) {
            return res.status(400).send(result.error);
        };

        return res.status(200).json({ message: 'Carrito actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el carrito' });
    };
};

module.exports = { updateCart };