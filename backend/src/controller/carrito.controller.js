const carritoService = require('../services/carrito.services');

const crearCarrito = async (req, res) => {
    try {
        const { usuarioId } = req.body;
        const carrito = await carritoService.crearCarrito(usuarioId);
        res.status(201).json(carrito);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const obtenerCarritoPorUsuario = async (req, res) => {
    try {
        const usuarioId = req.Usuario?.id || req.params.usuarioId; 
        const carrito = await carritoService.obtenerItemsDelCarrito(usuarioId);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const actualizarCantidadController = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { cantidad } = req.body;

        if (!cantidad || cantidad < 1) {
            return res.status(400).json({ message: "La cantidad debe ser un número mayor a 0." });
        }

        const itemActualizado = await carritoService.actualizarCantidad(itemId, cantidad);
        res.status(200).json(itemActualizado);

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Error interno del servidor" });
    }
};



const agregarItem = async (req, res) => {
    try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.Usuario?.id || req.body.usuarioId; 
    const item = await carritoService.agregarItem(usuarioId, productoId, cantidad);
    res.status(201).json(item);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}



module.exports = { crearCarrito, obtenerCarritoPorUsuario,agregarItem ,actualizarCantidadController};
