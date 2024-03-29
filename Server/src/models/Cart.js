const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};