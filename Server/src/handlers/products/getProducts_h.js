const { Product, License } = require('../../db');

const getProducts_h = async () => {
    const products = await Product.findAll({
        include: License,
        // where: where,
        // order: sortOrder === 'random' ? Sequelize.literal('random()') : [['id', order]],
        // limit: limit,
        // offset: offset,
        // attributes: attributes
    });

    return products;
};

module.exports = { getProducts_h };