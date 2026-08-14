const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens (En producción, esto va en un archivo .env)
const SECRET_KEY = 'miderma_secreto_super_seguro'; 

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Buscar si el usuario existe
        const usuario = await Usuario.buscarPorUsername(username);
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // 2. Comparar la contraseña enviada con la encriptada en la BD
        const contraseñaValida = await bcrypt.compare(password, usuario.password_hash);
        if (!contraseñaValida) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // 3. Si todo es correcto, crear el Token (JWT)
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username }, 
            SECRET_KEY, 
            { expiresIn: '8h' } // El administrador tendrá que volver a loguearse después de 8 horas
        );

        // 4. Enviar el token al frontend
        res.json({ mensaje: 'Login exitoso', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Función extra para que puedas crear tu primer administrador
const registrarAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Encriptar la contraseña (da 10 saltos de seguridad)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await Usuario.crear(username, passwordHash);
        res.status(201).json({ mensaje: 'Administrador creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el administrador' });
    }
};

module.exports = { login, registrarAdmin };