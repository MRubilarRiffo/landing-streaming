const { getUser_h } = require("../../handlers/user/getUser_h");
const { includedClause } = require("../../helpers/includedClause");
const { whereClause } = require("../../helpers/whereClause");
const { getTotalUsers } = require("../../handlers/user/getTotalUsers");

const getUser = async (req, res) => {
    try {
        const limit = 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;

        const filters = {
            id: req.query.id
        };

        const where = whereClause(filters);

        const sortOrder = req.query.sortOrder || 'asc';
        let order = [
            [ 'id' , sortOrder === 'desc' ? 'DESC' : 'ASC' ]
        ];

        const allowedFields = [ 'id', 'username', 'email', 'createdAt', 'updatedAt' ];
        const selectedFields = req.query.fields ? req.query.fields.split(',') : null;
        const attributes = selectedFields && selectedFields.filter(field => allowedFields.includes(field));

        const include = req.query.included ? includedClause(req.query.included) : [];

        const props = { where, order, limit, offset, attributes, include };

        const users = await getUser_h(props);

        if (users.error) {
            return res.status(400).send(users.error);
        } else {
            const totalUsers = await getTotalUsers(props);

            const totalPages = Math.ceil(totalUsers / limit);

            const response = {
                Metadata: {
                    'Total Users': totalUsers,
                    'Total Pages': totalPages,
                    'Current Page': currentPage
                },
                Data: users
            };

            return res.json(response);
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el carrito' });
    };
};

module.exports = { getUser };