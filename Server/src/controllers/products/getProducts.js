const { getProductsFindAll } = require('../../handlers/products/getProductsFindAll');
const { whereClause } = require('../../helpers/whereClause');
const { includedClause } = require('../../helpers/includedClause');
const { orderClause } = require('../../helpers/orderClause');

const getProducts = async (req, res) => {
    try {
        const limit = req.query.limit > 0 ? parseInt(req.query.limit) : 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;
        
        const filters = {
            name: req.query.name,
            slug: req.query.slug,
            id: req.query.id
        };
        
        const where = whereClause(filters);
        
        const sortOrder = req.query.sortOrder || 'id,asc';
        let order = orderClause(sortOrder);
        
        const allowedFields = [ 'id', 'name', 'description', 'features', 'previousPrice', 'salePrice', 'slug', 'averageRating', 'immediateDelivery', 'image', 'category', 'bulkPrice', 'createdAt', 'updatedAt' ];
        const selectedFields = req.query.fields ? req.query.fields.split(',') : null;
        const attributes = selectedFields && selectedFields.filter(field => allowedFields.includes(field));
        
        const include = req.query.included ? includedClause(req.query.included) : [];
                
        const queryOptions = { where, order, limit, offset, attributes, include };

        const { count, rows: products } = await getProductsFindAll(queryOptions);

        if (products.error) {
            return res.status(400).send(products.error);
        } else {
            const totalPages = Math.ceil(count / limit);

            const response = {
                metadata: {
                    'Total Products': count,
                    'Total Pages': totalPages,
                    'Current Page': currentPage
                },
                data: products
            };

            return res.json(response);
        };  
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener productos' });
    };
};

module.exports = { getProducts };