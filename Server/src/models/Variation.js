const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Variation', {
        name: {
            type: DataTypes.STRING,
        },
        minPrice: {
            type: DataTypes.INTEGER,
        },
        maxPrice: {
            type: DataTypes.INTEGER,
        },
    });
}; 