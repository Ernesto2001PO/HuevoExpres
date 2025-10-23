const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Carrito = sequelize.define('Carrito', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName: 'carrito',
        timestamps: false,
    });

    return Carrito;
};
