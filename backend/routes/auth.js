const express = require('express');
const router = express.Router();
const { login, registrarAdmin } = require('../controllers/auth');

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta temporal para crear a tu usuario administrador
router.post('/registrar', registrarAdmin); 

module.exports = router;