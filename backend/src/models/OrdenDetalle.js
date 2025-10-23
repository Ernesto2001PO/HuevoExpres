// src/models/OrdenDetalle.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const OrdenDetalle = sequelize.define('OrdenDetalle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, autoIncrement: true
        },
        ordenId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {
        tableName: 'orden_detalle',
        timestamps: false,
    });

    return OrdenDetalle;
};
