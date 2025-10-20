const express = require('express');
const router = express.Router();
const { loginController, registerController } = require('../controller/auth.controller');
const { verifyToken } = require('../services/auth.services');


router.post("/login", loginController);
router.post("/registro", registerController);
router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "You have access", user: req.user });
});

module.exports = router;
