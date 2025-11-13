const { sequelize } = require("../../config/db.config");

const Usuario = require("./Usuario")(sequelize);
const Producto = require("./Productos")(sequelize);
const Carrito = require('./Carrito')(sequelize);
const CarritoItem = require('./CarritoItem')(sequelize);
const Orden = require('./Orden')(sequelize);
const OrdenDetalle = require('./OrdenDetalle')(sequelize);
const Direccion = require('./Direccion')(sequelize);



// Relaciones
Usuario.hasOne(Carrito, { foreignKey: 'usuarioId', as: 'carrito' });
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Carrito.hasMany(CarritoItem, { foreignKey: 'carritoId', as: 'items' });
CarritoItem.belongsTo(Carrito, { foreignKey: 'carritoId' });

CarritoItem.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });


Usuario.hasMany(Orden, { foreignKey: 'usuarioId', as: 'ordenes' });
Orden.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Orden.hasMany(OrdenDetalle, { foreignKey: 'ordenId', as: 'items' });
OrdenDetalle.belongsTo(Orden, { foreignKey: 'ordenId' });

OrdenDetalle.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
Producto.hasMany(OrdenDetalle, { foreignKey: 'productoId' });



Usuario.hasMany(Direccion, {
    foreignKey: 'usuarioId',
    as: 'direcciones'
});
Direccion.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
});


Orden.belongsTo(Direccion, {
    foreignKey: 'direccionId',
    as: 'direccion' 
});
Direccion.hasMany(Orden, {
    foreignKey: 'direccionId',
    as: 'ordenes'
});


module.exports = {
    sequelize,
    Usuario,
    Producto,
    Carrito,
    CarritoItem,
    Orden,
    OrdenDetalle,
    Direccion,
    Sequelize: sequelize.Sequelize
};