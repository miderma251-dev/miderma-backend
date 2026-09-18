const express = require('express');
const router = express.Router();
const { obtenerPublicaciones, obtenerPublicacionPorId, obtenerPublicacionesRelacionadas, crearPublicacion, actualizarPublicacion, desactivarPublicacion, cambiarEstadoPublicacion } = require('../controllers/publicaciones');

router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.get('/:id/relacionados', obtenerPublicacionesRelacionadas); // LA NUEVA RUTA
router.post('/', crearPublicacion);
router.put('/:id', actualizarPublicacion);
router.delete('/:id', desactivarPublicacion);
router.put('/:id/estado', cambiarEstadoPublicacion);

module.exports = router;