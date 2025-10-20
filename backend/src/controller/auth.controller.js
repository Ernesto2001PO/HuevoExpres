const { login,register } = require('../services/auth.services')


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

const registerController = async (req, res) => {
    try {
        const { nombre,email, password } = req.body;
        const user = await register(nombre,email, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

module.exports = { loginController, registerController };