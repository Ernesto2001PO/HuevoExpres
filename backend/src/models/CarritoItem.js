// src/models/carritoItem.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CarritoItem = sequelize.define('CarritoItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        carritoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        tableName: 'carrito_item',
        timestamps: false,
    });

    return CarritoItem;
};
