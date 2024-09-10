const { getProducts_h } = require("../../handlers/products/getProducts_h");
const { includedClause } = require("../../helpers/includedClause");

const calculateTotal = async (req, res, next) => {
    try {
        const { products } = req.body;
        
        if (!Array.isArray(products) || products.length === 0) {
            const error = new Error('Se encontraron errores de validación: products no es un arreglo o está vacío.');
            error.statusCode = 400;
            throw error;
        };

        const productIds = products.map(product => product.productId);

        const queryOptions = {
            where: {
                id: productIds
            },
            include: {
                model: includedClause('variation')[0],
                attributes: [ 'id' ],
                include: includedClause('productVariation')
            },
            attributes: [ 'id', 'name', 'salePrice' ]
        };

        const { rows: dataProducts } = await getProducts_h(queryOptions);

        if (!dataProducts) {
            const error = new Error('No se encontraron productos.');
            error.statusCode = 404;
            throw error;
        };

        const response = products.reduce((acc, { productId, quantity, variationId }) => {
            const product = dataProducts.find(item => productId === item.id);
            if (!product) return acc; // Evitar errores si no se encuentra el producto

            let salePrice = product.salePrice;
            let name = product.name;

            // Buscar variación si existe
            if (variationId && product.Variations?.[0]?.ProductVariations) {
                const variation = product.Variations[0].ProductVariations.find(item => variationId === item.id);
                if (variation) {
                    salePrice = variation.salePrice;
                    name += ` - ${variation.value}`;
                }
            }

            const subTotal = salePrice * quantity;
            acc.total += subTotal;

            acc.items.push({ id: productId, name, salePrice, quantity, subTotal });
            return acc;
        }, { items: [], total: 0 });

        return res.json(response);
    } catch (error) {
        next(error);
    };
};

module.exports = calculateTotal;