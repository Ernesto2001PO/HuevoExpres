const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    generarPassword: async (password) => {
        if (!password) throw new Error("Password vacío o no definido");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },

    compararPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },

    generarToken: (usuario) => {
        return jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.API_SECRET_KEY_JWT,
            { expiresIn: "1h" }
        );
    }
};
