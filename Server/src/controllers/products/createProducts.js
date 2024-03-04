const { createProducts_h } = require('../../handlers/products/createProducts_h');

const createProducts = async (req, res, next) => {
    try {
        const { name, description, price, priceOffert } = req.body;

        if (!name || !description || price < 0 || typeof price == 'string' || priceOffert < 0 || typeof priceOffert == 'string') {
            throw Error('missing data for registration');
        }
        
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
        const product = await createProducts_h(name, description, price, priceOffert, slug);

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