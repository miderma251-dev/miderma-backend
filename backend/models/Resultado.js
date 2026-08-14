const pool = require('../config/db');

const Resultado = {
    // 1. Obtener todos (incluyendo ocultos para el panel admin)
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM resultados_casos ORDER BY fecha_creacion DESC');
        return rows;
    },
    obtenerPorId: async (id) => {
        const [rows] = await pool.query('SELECT * FROM resultados_casos WHERE id = ?', [id]);
        return rows[0];
    },
    // 2. Crear con estado
    crear: async (datos) => {
        const { nombre_caso, descripcion, url_imagen_antes, url_imagen_despues, estado } = datos;
        const query = `INSERT INTO resultados_casos (nombre_caso, descripcion, url_imagen_antes, url_imagen_despues, estado) VALUES (?, ?, ?, ?, ?)`;
        const [resultado] = await pool.query(query, [nombre_caso, descripcion, url_imagen_antes, url_imagen_despues, estado !== undefined ? estado : 1]);
        return resultado;
    },
    // 3. Actualizar
    actualizar: async (id, datos) => {
        const { nombre_caso, descripcion, url_imagen_antes, url_imagen_despues, estado } = datos;
        const query = `UPDATE resultados_casos SET nombre_caso = ?, descripcion = ?, url_imagen_antes = ?, url_imagen_despues = ?, estado = ? WHERE id = ?`;
        const [resultado] = await pool.query(query, [nombre_caso, descripcion, url_imagen_antes, url_imagen_despues, estado, id]);
        return resultado;
    },
    // 4. Borrado Físico Definitivo (para el botón Borrar)
    desactivar: async (id) => {
        const [resultado] = await pool.query('DELETE FROM resultados_casos WHERE id = ?', [id]);
        return resultado;
    },
    // 5. Cambiar Estado (Ocultar/Mostrar)
    cambiarEstado: async (id, estado) => {
        const [resultado] = await pool.query('UPDATE resultados_casos SET estado = ? WHERE id = ?', [estado, id]);
        return resultado;
    }
};

module.exports = Resultado;