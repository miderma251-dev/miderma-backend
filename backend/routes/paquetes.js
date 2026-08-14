const express = require('express');
const router = express.Router();
const { obtenerPaquetes, obtenerPaquetePorId, crearPaquete, actualizarPaquete, desactivarPaquete } = require('../controllers/paquetes');

router.get('/', obtenerPaquetes);
router.get('/:id', obtenerPaquetePorId);
router.post('/', crearPaquete);
router.put('/:id', actualizarPaquete);
router.delete('/:id', desactivarPaquete);

module.exports = router;