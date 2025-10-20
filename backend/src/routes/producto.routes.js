const express = require('express');
const router = express.Router();
const { registroProductoController,obtenerProductos } = require('../controller/producto.controller');


router.post("/registro", registroProductoController);
router.get("/obtener", obtenerProductos);





module.exports = router;
