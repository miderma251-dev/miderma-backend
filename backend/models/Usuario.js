const pool = require('../config/db');

const Usuario = {
    buscarPorUsername: async (username) => {
        const [rows] = await pool.query('SELECT * FROM usuarios_admin WHERE username = ? AND estado = 1', [username]);
        return rows[0];
    },
    
    // Usaremos esto solo una vez para crear tu primer usuario administrador
    crear: async (username, passwordHash) => {
        const [resultado] = await pool.query(
            'INSERT INTO usuarios_admin (username, password_hash) VALUES (?, ?)', 
            [username, passwordHash]
        );
        return resultado;
    }
};

module.exports = Usuario;