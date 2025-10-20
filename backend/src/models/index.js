const { sequelize } = require("../../config/db.config");

const Usuario = require("./Usuario")(sequelize);
const Producto = require("./Productos")(sequelize);





module.exports = {
    sequelize,
    Usuario,
    Producto,
    Sequelize: sequelize.Sequelize
};