const { where } = require('sequelize');
const { Producto } = require('../models');


const obtenerTodosLosProductos = async () => {
    const productos = await Producto.findAll();
    return productos;
};


const obtenerProductoUnicoPorId = async (productoId) => {
    const producto = await Producto.findById(productoId);

    if (!producto) {
        throw { status: 404, message: "Producto no encontrado." };
    }

    return producto;
};

const registroProducto = async (nombre, descripcion, precio, stock, categoria, imageUrl, disponible) => {
    
    const existingNombre = await Producto.findOne({ where: { nombre } });
    if (existingNombre) {
        throw { status: 409, message: "Producto ya existe" };
    }

    const newProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imageUrl,
        disponible
    });

    return {
        id: newProducto.id,
        nombre: newProducto.nombre,
        precio: newProducto.precio
    };
};


module.exports = {
    obtenerTodosLosProductos,
    obtenerProductoUnicoPorId,
    registroProducto
};
