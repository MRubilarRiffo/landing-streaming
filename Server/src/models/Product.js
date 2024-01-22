const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        priceOffert: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            },
        },
    });
};