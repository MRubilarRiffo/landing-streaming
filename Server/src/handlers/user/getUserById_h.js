const { User } = require('../../db');

const getUserById_h = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) return { error: 'Usuario no encontrado' };
        
        return user;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getUserById_h };