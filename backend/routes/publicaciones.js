const express = require('express');
const router = express.Router();
// Importamos la nueva función cambiarEstadoPublicacion
const { obtenerPublicaciones, obtenerPublicacionPorId, crearPublicacion, actualizarPublicacion, desactivarPublicacion, cambiarEstadoPublicacion } = require('../controllers/publicaciones');

router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.post('/', crearPublicacion);
router.put('/:id', actualizarPublicacion);
router.delete('/:id', desactivarPublicacion);
router.put('/:id/estado', cambiarEstadoPublicacion); // NUEVA RUTA DE OCULTAR/MOSTRAR

module.exports = router;