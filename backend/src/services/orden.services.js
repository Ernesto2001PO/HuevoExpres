const { Carrito, CarritoItem, Orden, OrdenDetalle, Producto, Direccion, sequelize } = require('../models');

const crearOrden = async (usuarioId, itemsRecibidos, direccionId) => {
    if (!itemsRecibidos || !Array.isArray(itemsRecibidos) || itemsRecibidos.length === 0) {
        throw { status: 400, message: "No se proporcionaron items para crear la orden." };
    }

    const t = await sequelize.transaction();

    try {
        const direccionValida = await Direccion.findOne({
            where: { id: direccionId, usuarioId: usuarioId },
            transaction: t
        });

        if (!direccionValida) {
            throw { status: 404, message: "Dirección no válida o no pertenece al usuario." };
        }

        let totalCalculado = 0;
        const detallesParaGuardar = [];

        for (const item of itemsRecibidos) {
            if (!item.productoId || !item.cantidad || item.cantidad < 1) {
                throw { status: 400, message: `Item inválido recibido: ${JSON.stringify(item)}` };
            }
            const productoDB = await Producto.findByPk(item.productoId, { transaction: t });
            if (!productoDB) {
                throw { status: 404, message: `Producto con ID ${item.productoId} no encontrado.` };
            }
            if (!productoDB.disponible) {
                throw { status: 400, message: `El producto "${productoDB.nombre}" no está disponible.` };
            }
            if (productoDB.stock < item.cantidad) {
                throw { status: 400, message: `Stock insuficiente para "${productoDB.nombre}". Solo quedan ${productoDB.stock}.` };
            }


            const subtotal = productoDB.precio * item.cantidad;
            totalCalculado += subtotal;
            detallesParaGuardar.push({
                productoId: item.productoId,
                cantidad: item.cantidad,
                precio: productoDB.precio,
                subtotal: subtotal
            });
            productoDB.stock -= item.cantidad;
            await productoDB.save({ transaction: t });
        }

        const orden = await Orden.create({
            usuarioId,
            direccionId: direccionId, 
            total: totalCalculado,
            estado: 'Pendiente'
        }, { transaction: t });

        const detallesConOrdenId = detallesParaGuardar.map(detalle => ({
            ...detalle,
            ordenId: orden.id
        }));
        await OrdenDetalle.bulkCreate(detallesConOrdenId, { transaction: t });

        const carritoUsuario = await Carrito.findOne({ where: { usuarioId, activo: true } });
        if (carritoUsuario) {
            carritoUsuario.activo = false;
            await carritoUsuario.save({ transaction: t });
        }

        await t.commit();

        return await Orden.findByPk(orden.id, {
            include: [
                {
                    model: OrdenDetalle,
                    as: 'items',
                    include: {
                        model: Producto,
                        as: 'producto'
                    }
                },
                {
                    model: Direccion, 
                    as: 'direccion'  
                }
            ]
        });

    } catch (error) {
        await t.rollback();
        console.error("Error en servicio al crear orden:", error);
        throw error;
    }
};

const obtenerOrdenDelUsuario = async (usuarioId) => {

    const ordenes = await Orden.findAll({
        where: { usuarioId: usuarioId }, 

        include: [
            {
                model: OrdenDetalle,
                as: 'items',
                include: {
                    model: Producto,
                    as: 'producto'
                }
            },
            {
                model: Direccion, 
                as: 'direccion'
            }
        ],
        order: [['fecha', 'DESC']]
    });
    return ordenes;
};


module.exports = { crearOrden, obtenerOrdenDelUsuario };
