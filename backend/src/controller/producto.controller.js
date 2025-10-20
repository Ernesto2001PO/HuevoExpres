const { obtenerTodosLosProductos,registroProducto } = require('../services/producto.servcies')


const obtenerProductos = async (req,res) => {
    try {
        const productos = await obtenerTodosLosProductos();
        res.status(201).json({ productos });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

const registroProductoController = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria, imageUrl, disponible } = req.body;
        const producto = await registroProducto(nombre, descripcion, precio, stock, categoria, imageUrl, disponible);
        res.status(201).json({ producto });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

module.exports = { obtenerProductos, registroProductoController };


