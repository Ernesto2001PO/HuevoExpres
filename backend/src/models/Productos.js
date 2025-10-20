const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Producto = sequelize.define(
        'Producto',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            precio: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Huevos",
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:
                    'https://img.freepik.com/vector-gratis/huevo-estilo-dibujos-animados_78370-1042.jpg?semt=ais_hybrid&w=740&q=80',
            },
            disponible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: 'producto',
            timestamps: false,
        }
    );

    return Producto;
};
