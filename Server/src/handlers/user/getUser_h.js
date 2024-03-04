const { User } = require('../../db');

const getUser_h = async (props) => {
    try {
        const users = await User.findAll(props);

        if (!users || users.length === 0) return { error: 'Usuarios no encontrados' };
    
        return users;
    } catch (error) {
        return error.message;
    }
};

module.exports = { getUser_h };