const express = require('express');
const router = express.Router();
const { crearOrdenController, obtenerMisOrdenesController } = require('../controller/orden.controller');

const authMiddleware = require('../middleware/auth.middleware');



router.post("/crear", crearOrdenController);
router.get("/:usuarioId", obtenerMisOrdenesController);

module.exports = router;
