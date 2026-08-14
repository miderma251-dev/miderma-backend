const express = require('express');
const router = express.Router();

// Importamos el controlador con el nombre exacto de la carpeta
const productosController = require('../controllers/productos');

// Rutas CRUD básicas
router.get('/', productosController.obtenerProductos);
router.get('/:id', productosController.obtenerProductoPorId);
router.post('/', productosController.crearProducto);
router.put('/:id', productosController.actualizarProducto);
router.delete('/:id', productosController.desactivarProducto);

// Rutas de inventario e historial (Las nuevas)
router.post('/:id/movimientos', productosController.registrarMovimiento);
router.get('/:id/historial', productosController.obtenerHistorialProducto);

module.exports = router;