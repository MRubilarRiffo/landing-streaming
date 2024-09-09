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
        features: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
            validate: {
                isArray(value) {
                    if (!Array.isArray(value)) {
                        throw new Error('Features debe ser un array.');
                    }
                }
            }
        },
        previousPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salePrice: {
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
        },
        variation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
};