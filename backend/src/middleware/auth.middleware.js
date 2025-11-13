const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó token." });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token mal formado o ausente." });
    }

    try {
        
        const decodedPayload = jwt.verify(token, process.env.API_SECRET_KEY_JWT);
        req.user = decodedPayload;
        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Token inválido." });
        }
        res.status(400).json({ message: "Error al validar el token." });
    }
}

module.exports = authMiddleware;