const express = require('express');
const router = express.Router();
const direccionController = require('../controller/direccion.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post("/crear", authMiddleware,direccionController.crearDireccion);
router.get("/obtener", direccionController.obtenerDireccion);
router.get("/obtener/:usuarioId", direccionController.obtenerDireccionDelUsuario)
router.put("/actualizar/:direccionId", authMiddleware, direccionController.actualizarDireccion);





module.exports = router;
