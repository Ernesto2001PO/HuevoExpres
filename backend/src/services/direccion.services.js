const { Direccion, Usuario } = require('../models');



const crearDireccion = async (usuarioId, alias, calle_avenida, numero, referencia_adicional, latitud, longitud) => {

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
        throw { status: 404, message: "Usuario no encontrado" };
    }

    try {
        const nuevaDireccion = await Direccion.create({
            usuarioId: usuarioId,
            alias: alias,
            calle_avenida: calle_avenida,
            numero: numero,
            referencia_adicional: referencia_adicional,
            latitud: latitud,     
            longitud: longitud   
        });
        return nuevaDireccion
    } catch (error) {
        console.log("Error de validacion al crear la direcciom ", error.message)
        throw { status: 400, message: "Datos incompletos o invalidos", originalError: error }
    }
}

const obtenerTodasLasDirecciones = async () => {
    const direcciones = await Direccion.findAll();
    return direcciones;

}

const obtenerTodasLasDireccionesDelUsuario = async (idDelUsuario) => {

    const direccionesDelUsuario = await Direccion.findAll({
        where: {
            usuarioId: idDelUsuario
        }
    });

    return direccionesDelUsuario;
}


const actualizarDireccion = async (direccionId, usuarioId, datosActualizados) => {

    const direccion = await Direccion.findOne({
        where: {
            id: direccionId,
            usuarioId: usuarioId
        }
    });

    if (!direccion) {
        throw { status: 404, message: "Dirección no encontrada o no te pertenece" };
    }

    await direccion.update(datosActualizados);

    return direccion;
}

module.exports = {
    crearDireccion,
    obtenerTodasLasDirecciones,
    obtenerTodasLasDireccionesDelUsuario,
    actualizarDireccion
}