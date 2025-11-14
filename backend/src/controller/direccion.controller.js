const direccionServices = require('../services/direccion.services')





const crearDireccion = async (req, res) => {
    try {
        const { alias, calle_avenida, numero, referencia_adicional, latitud, longitud } = req.body;

        const usuarioId = req.user.id;
        if (!usuarioId) {
            return res.status(401).json({ message: "Usuario no autenticado (payload no encontrado)" });
        }

        const nuevaDireccion = await direccionServices.crearDireccion(
            usuarioId,
            alias,
            calle_avenida,
            numero,
            referencia_adicional,
            latitud,  
            longitud  
        );
        res.status(201).json(nuevaDireccion);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
}



const obtenerDireccion = async (req, res) => {
    try {
        const direcciones = await direccionServices.obtenerTodasLasDirecciones();
        res.status(201).json({ direcciones });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
}

const obtenerDireccionDelUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params
        if (!usuarioId) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const direcciones = await direccionServices.obtenerTodasLasDireccionesDelUsuario(usuarioId);
        res.status(201).json({ direcciones });


    } catch (error) {

        res.status(error.status || 500).json({ message: error.message || "Internal server error" });


    }
}

const actualizarDireccion = async (req, res) => {
    try {
        const { direccionId } = req.params;

        const usuarioId = req.user.id;

        const datosActualizados = req.body;

        if (!usuarioId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }
        
        const direccionActualizada = await direccionServices.actualizarDireccion(
            direccionId,
            usuarioId,
            datosActualizados
        );



        res.status(200).json(direccionActualizada); 

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error interno del servidor"
        });
    }
}


module.exports = {
    crearDireccion,
    obtenerDireccion,
    obtenerDireccionDelUsuario,
    actualizarDireccion
}