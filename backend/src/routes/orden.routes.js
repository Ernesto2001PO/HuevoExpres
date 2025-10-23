const express = require('express');
const router = express.Router();
const { crearOrdenController, obtenerMisOrdenesController } = require('../controller/orden.controller');


router.post("/crear", crearOrdenController);
router.get("/:usuarioId", obtenerMisOrdenesController);

module.exports = router;
