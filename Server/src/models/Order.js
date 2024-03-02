const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            startValue: 555
        },
        prepayId_Binance: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            defaultValue: null,
        },
    });
};