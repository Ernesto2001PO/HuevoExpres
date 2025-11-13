const ordenService = require('../services/orden.services');

const crearOrdenController = async (req, res) => {
    try {
        const usuarioId = req.user.id;

        const { items, direccionId } = req.body;

        if (!usuarioId) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }

        if (!direccionId) {
            return res.status(400).json({ message: "Falta el ID de la dirección (direccionId)." });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Faltan los items del carrito o el formato es incorrecto." });
        }

        const orden = await ordenService.crearOrden(usuarioId, items, direccionId);

        res.status(201).json(orden);

    } catch (error) {
        console.error("Error en el controlador al crear orden:", error);
        res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
};


const obtenerMisOrdenesController = async (req, res) => {
    try {

        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ message: "Falta el ID de usuario en la URL." });
        }

        const ordenes = await ordenService.obtenerOrdenDelUsuario(usuarioId);
        res.status(200).json(ordenes);

    } catch (error) {
        console.error("Error en el controlador al obtener órdenes:", error);
        res.status(error.status || 500).json({ message: error.message || "Error interno del servidor al obtener órdenes" });
    }
};

module.exports = { crearOrdenController, obtenerMisOrdenesController };
