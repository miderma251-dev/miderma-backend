const pool = require('../config/db');

const Publicacion = {
    // 1. Ahora trae TODAS (visibles y ocultas)
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM publicaciones ORDER BY fecha_creacion DESC');
        return rows;
    },
    obtenerPorId: async (id) => {
        const [rows] = await pool.query('SELECT * FROM publicaciones WHERE id = ?', [id]);
        return rows[0];
    },
    // 2. AÑADIDO: 'categoria' en la creación
    crear: async (datos) => {
        const { titulo, contenido_texto, tipo_publicacion, categoria, url_media, estado } = datos;
        
        // Verificamos si no envían categoría para ponerle una por defecto
        const cat = categoria || 'General'; 

        const query = `INSERT INTO publicaciones (titulo, contenido_texto, tipo_publicacion, categoria, url_media, estado) VALUES (?, ?, ?, ?, ?, ?)`;
        const [resultado] = await pool.query(query, [titulo, contenido_texto, tipo_publicacion, cat, url_media, estado !== undefined ? estado : 1]);
        return resultado;
    },
    // 2. AÑADIDO: 'categoria' en la actualización
    actualizar: async (id, datos) => {
        const { titulo, contenido_texto, tipo_publicacion, categoria, url_media, estado } = datos;
        const query = `UPDATE publicaciones SET titulo = ?, contenido_texto = ?, tipo_publicacion = ?, categoria = ?, url_media = ?, estado = ? WHERE id = ?`;
        const [resultado] = await pool.query(query, [titulo, contenido_texto, tipo_publicacion, categoria, url_media, estado, id]);
        return resultado;
    },
    // 3. Borrado físico real
    desactivar: async (id) => {
        const [resultado] = await pool.query('DELETE FROM publicaciones WHERE id = ?', [id]);
        return resultado;
    },
    // 4. NUEVA: Para el botón rápido de Ocultar/Mostrar
    cambiarEstado: async (id, estado) => {
        const [resultado] = await pool.query('UPDATE publicaciones SET estado = ? WHERE id = ?', [estado, id]);
        return resultado;
    }
};

module.exports = Publicacion;