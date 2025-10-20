// Usaremos require/module.exports para ser consistentes con tu controlador de auth.
const { where } = require('sequelize');
const { Producto } = require('../models');

/**
 * Busca en la base de datos todos los productos disponibles.
 * @returns {Promise<Array>} Una lista de productos.
 */
const obtenerTodosLosProductos = async () => {
    const productos = await Producto.findAll();
    return productos;
};

/**
 * Busca un producto específico por su ID.
 * @param {string} productoId - El ID del producto a buscar.
 * @returns {Promise<Object>} El documento del producto encontrado.
 */
const obtenerProductoUnicoPorId = async (productoId) => {
    const producto = await Producto.findById(productoId);

    // Si no se encuentra, lanzamos un error que el controlador atrapará.
    if (!producto) {
        throw { status: 404, message: "Producto no encontrado." };
    }

    return producto;
};

const registroProducto = async (nombre, descripcion, precio, stock, categoria, imageUrl, disponible) => {
    // Verificar si el producto ya existe
    
    const existingNombre = await Producto.findOne({ where: { nombre } });
    if (existingNombre) {
        throw { status: 409, message: "Producto ya existe" };
    }

    // Crear nuevo producto
    const newProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imageUrl,
        disponible
    });

    // Retornar información básica
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
