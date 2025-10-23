const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Orden = sequelize.define('Orden', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false, defaultValue: "Pendiente"
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false, defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'orden',
        timestamps: false,
    });

    return Orden;
};
