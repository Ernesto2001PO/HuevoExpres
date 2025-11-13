// models/direccion.model.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Direccion = sequelize.define('direccion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuario', 
                key: 'id'
            }
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Ej: "Casa", "Oficina", "Restaurante"'
        },
        calle_avenida: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: true, 
            comment: 'Ej: "742", "S/N", "Km 5"'
        },
        referencia_adicional: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Ej: "Edificio azul, reja negra, apto 2B"'
        },
        latitud: {
            type: DataTypes.DECIMAL(10, 8), 
            allowNull: true
        },
        longitud: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'direccion'
    });


    Direccion.associate = (models) => {
        Direccion.belongsTo(models.usuario, {
            foreignKey: 'usuarioId',
            as: 'usuario' 
        });
    };

    return Direccion;
};