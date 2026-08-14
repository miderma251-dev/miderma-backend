const express = require('express');
const router = express.Router();
const { obtenerResultados, obtenerResultadoPorId, crearResultado, actualizarResultado, desactivarResultado, cambiarEstadoResultado } = require('../controllers/resultados');

router.get('/', obtenerResultados);
router.get('/:id', obtenerResultadoPorId);
router.post('/', crearResultado);
router.put('/:id', actualizarResultado);
router.delete('/:id', desactivarResultado);
router.put('/:id/estado', cambiarEstadoResultado);

module.exports = router;