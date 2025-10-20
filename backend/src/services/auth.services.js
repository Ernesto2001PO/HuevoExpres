require('dotenv').config();
const { sequelize } = require('../models');
const utils = require('../utils/auth.utils');
const { Usuario } = require('../models');

const login = async (email, password) => {
    if (!email || !password) {
        throw { status: 400, message: "Email y contraseña son requeridos" };
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        throw { status: 401, message: "Fallo de autenticación (usuario no encontrado)" };
    }

    // 🔹 Comparar password con bcrypt
    const validPassword = await utils.compararPassword(password, usuario.password_hash);
    if (!validPassword) {
        throw { status: 401, message: "Fallo de autenticación (contraseña incorrecta)" };
    }

    // 🔹 Generar JWT
    const token = utils.generarToken(usuario);
    return token;
};

const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    try {
        const payload = jwt.verify(token, process.env.API_SECRET_KEY_JWT);
        req.Usuario = { id: payload.id, email: payload.email };
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token no válido" });
    }
};

const register = async (nombre, email, password) => {
    const existingUsuario = await Usuario.findOne({ where: { email } });
    if (existingUsuario) throw { status: 409, message: "Usuario ya existe" };

    const hashedPassword = await utils.generarPassword(password);

    const newUsuario = await Usuario.create({
        nombre,
        email,
        password_hash: hashedPassword,
        es_admin: false 
        
    });

    return {
        id: newUsuario.id,
        nombre: newUsuario.nombre,
        email: newUsuario.email
    };
};


module.exports = { login, verifyToken,register };
