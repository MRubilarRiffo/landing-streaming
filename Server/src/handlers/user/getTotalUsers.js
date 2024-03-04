const { User } = require('../../db');

const getTotalUsers = async (props) => {
    try {
        const totalUsers = await User.count(props);

        return totalUsers;
    } catch (error) {
        return error;
    };
};

module.exports = { getTotalUsers };