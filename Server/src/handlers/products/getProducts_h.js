const { Product } = require('../../db');

const getProducts_h = async (props) => {
    try {
        const { count, rows } = await Product.findAndCountAll(props);

        if (!rows || rows.length === 0) return { error: 'Productos no encontrados' };
    
        return { count, rows };
    } catch (error) {
        return error.message;
    }
};

module.exports = { getProducts_h };