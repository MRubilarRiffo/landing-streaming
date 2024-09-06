const { createProducts_h } = require('../../handlers/products/createProducts_h');

const createProducts = async (req, res, next) => {
    try {
        const { name, description, previousPrice, salePrice } = req.body;

        if (!name || !description || previousPrice < 0 || typeof previousPrice == 'string' || salePrice < 0 || typeof salePrice == 'string') {
            throw Error('missing data for registration');
        }
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
        const product = await createProducts_h(name, description, previousPrice, salePrice, slug);

        if (!product) {
            return res.status(400).send(product.error)
        } else {
            return res.status(201).json({ data: product.dataValues });
        };
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

module.exports = { createProducts };