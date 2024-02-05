const { getProductById_h } = require("../../handlers/products/getProductById_h");

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await getProductById_h(id);

        if (product.error) res.status(400).send(product.error);
        else res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    };
};

module.exports = { getProductById };