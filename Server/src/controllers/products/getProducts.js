const { getProducts_h } = require('../../handlers/products/getProducts_h');

const getProducts = async (req, res, next) => {
    try {
        const products = await getProducts_h();

        products.error
            ? res.status(400).send(products.error)
            : res.json({ data: products });
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    };
};

module.exports = { getProducts };