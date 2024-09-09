const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ProductVariation', {
        value: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        previousPrice: {
            type: DataTypes.INTEGER,
        },
        salePrice: {
            type: DataTypes.INTEGER,
        }
    })
};