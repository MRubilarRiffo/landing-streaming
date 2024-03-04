const { getCarts_h } = require('../../handlers/cart/getCarts_h');
const { whereClause } = require('../../helpers/whereClause');
const { getTotalCarts } = require('../../handlers/cart/getTotalCarts');
const { includedClause } = require('../../helpers/includedClause');

const getCarts = async (req, res) => {
    try {
        const limit = 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;
        
        const filters = {
            UserId: req.query.userid,
            id: req.query.id
        };

        const where = whereClause(filters)

        const sortOrder = req.query.sortOrder || 'asc';
        let order = [
            [ 'id' , sortOrder === 'desc' ? 'DESC' : 'ASC' ]
        ];

        const allowedFields = [ 'id', 'amount', 'UserId', 'createdAt', 'updatedAt' ];
        const selectedFields = req.query.fields ? req.query.fields.split(',') : null;
        const attributes = selectedFields && selectedFields.filter(field => allowedFields.includes(field));

        const include = req.query.included ? includedClause(req.query.included) : [];
        
        const props = { where, order, limit, offset, attributes, include };

        const carts = await getCarts_h(props);

        if (carts.error) {
            return res.status(400).send(carts.error);
        } else {
            const totalCarts = await getTotalCarts(props);

            const totalPages = Math.ceil(totalCarts / limit);

            const response = {
                Metadata: {
                    'Total Carts': totalCarts,
                    'Total Pages': totalPages,
                    'Current Page': currentPage
                },
                Data: carts
            };

            return res.json(response);
        };  
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener carritos' });
    };
};

module.exports = { getCarts };