const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('License', {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
};