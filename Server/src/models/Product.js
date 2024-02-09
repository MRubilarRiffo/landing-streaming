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
            defaultValue: ''
        },
        shortDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
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
        immediateDelivery: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        bulkPrice: {
            type: DataTypes.JSON,
            defaultValue: null
        }
    });
};