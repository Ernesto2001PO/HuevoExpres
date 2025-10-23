const { Carrito, Usuario,Producto,CarritoItem } = require('../models');

const crearCarrito = async (usuarioId) => {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
        throw { status: 404, message: "Usuario no encontrado" };
    }

    const carritoExistente = await Carrito.findOne({
        where: { usuarioId, activo: true },
    });
    if (carritoExistente) {
        return carritoExistente; 
    }

    const nuevoCarrito = await Carrito.create({
        usuarioId,
        activo: true,
        total: 0,
    });

    return nuevoCarrito;
};


const obtenerCarritoPorUsuario = async (usuarioId) => {
    const carrito = await Carrito.findOne({
        where: { usuarioId, activo: true },
    });
    if (!carrito) throw { status: 404, message: "No hay carrito activo" };
    return carrito;
};

const obtenerItemsDelCarrito = async (usuarioId) => {
    const carrito = await Carrito.findOne({
        where: { usuarioId, activo: true },
        include: {
            model: CarritoItem,
            as: 'items',
            include: {
                model: Producto,
                as: 'producto'
            }
        }
    });

    if (!carrito) throw { status: 404, message: "No hay carrito activo" };

    return carrito; 
};

const agregarItem = async (usuarioId, productoId, cantidad = 1) => {
    let carrito = await Carrito.findOne({ where: { usuarioId, activo: true } });

    if (!carrito) {
        carrito = await Carrito.create({ usuarioId, activo: true, total: 0 });
    }

    const producto = await Producto.findByPk(productoId);
    if (!producto) throw new Error('Producto no encontrado');

    const subtotal = producto.precio * cantidad;

    let item = await CarritoItem.findOne({
        where: { carritoId: carrito.id, productoId },
    });

    if (item) {
        item.cantidad += cantidad;
        item.subtotal = item.cantidad * producto.precio;
        await item.save();
    } else {
        item = await CarritoItem.create({
            carritoId: carrito.id,
            productoId,
            cantidad,
            subtotal,
        });
    }

    const items = await CarritoItem.findAll({ where: { carritoId: carrito.id } });
    const totalCarrito = items.reduce((sum, i) => sum + i.subtotal, 0);
    carrito.total = totalCarrito;
    await carrito.save();

    return item;
};

const actualizarCantidad = async (carritoItemId, cantidad) => {
    const item = await CarritoItem.findByPk(carritoItemId, {
        include: { model: Producto, as: 'producto' } 
    });

    if (!item) {
        throw { status: 404, message: "Ítem del carrito no encontrado" };
    }

    item.cantidad = cantidad;
    item.subtotal = item.producto.precio * cantidad; 

    await item.save();

    return item;
};







module.exports = { crearCarrito, obtenerCarritoPorUsuario,agregarItem ,obtenerItemsDelCarrito, actualizarCantidad};
