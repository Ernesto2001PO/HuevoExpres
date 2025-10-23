const express = require('express');
const router = express.Router();
const carritoController = require('../controller/carrito.controller');


router.post('/crear', carritoController.crearCarrito);
router.get('/:usuarioId', carritoController.obtenerCarritoPorUsuario);
router.post('/agregar', carritoController.agregarItem);
router.put('/item/:itemId' , carritoController.actualizarCantidadController)

module.exports = router;
