const pool = require('../config/db');

const Publicacion = {
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM publicaciones ORDER BY fecha_creacion DESC');
        return rows;
    },
    obtenerPorId: async (id) => {
        const query = `
            SELECT p.*, pd.contenido_html 
            FROM publicaciones p 
            LEFT JOIN publicacion_detalles pd ON p.id = pd.publicacion_id 
            WHERE p.id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    },
    obtenerRelacionados: async (id, categoria) => {
        const query = `
            SELECT * FROM publicaciones 
            WHERE categoria = ? AND id != ? AND estado = 1 
            ORDER BY fecha_creacion DESC LIMIT 3
        `;
        const [rows] = await pool.query(query, [categoria, id]);
        return rows;
    },
    crear: async (datos) => {
        const { titulo, categoria, tipo_publicacion, extracto, url_media, contenido_html, estado, destacado } = datos;
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction(); // Empezamos transacción segura
            
            // 1. Insertar la portada
            const queryPub = `INSERT INTO publicaciones (titulo, categoria, tipo_publicacion, extracto, url_media, estado, destacado) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [resPub] = await connection.query(queryPub, [titulo, categoria || 'General', tipo_publicacion, extracto, url_media, estado !== undefined ? estado : 1, destacado ? 1 : 0]);
            
            const pubId = resPub.insertId;
            
            // 2. Insertar el cuerpo del texto
            const queryDet = `INSERT INTO publicacion_detalles (publicacion_id, contenido_html) VALUES (?, ?)`;
            await connection.query(queryDet, [pubId, contenido_html || '']);
            
            await connection.commit(); // Confirmamos los cambios
            return resPub;
        } catch (error) {
            await connection.rollback(); // Si algo falla, deshacemos todo
            throw error;
        } finally {
            connection.release();
        }
    },
    actualizar: async (id, datos) => {
        const { titulo, categoria, tipo_publicacion, extracto, url_media, contenido_html, estado, destacado } = datos;
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            
            // Actualizar portada
            const queryPub = `UPDATE publicaciones SET titulo = ?, categoria = ?, tipo_publicacion = ?, extracto = ?, url_media = ?, estado = ?, destacado = ? WHERE id = ?`;
            await connection.query(queryPub, [titulo, categoria, tipo_publicacion, extracto, url_media, estado, destacado ? 1 : 0, id]);
            
            // Comprobar si existe el detalle
            const [detalles] = await connection.query('SELECT id FROM publicacion_detalles WHERE publicacion_id = ?', [id]);
            if(detalles.length > 0) {
                await connection.query('UPDATE publicacion_detalles SET contenido_html = ? WHERE publicacion_id = ?', [contenido_html, id]);
            } else {
                await connection.query('INSERT INTO publicacion_detalles (publicacion_id, contenido_html) VALUES (?, ?)', [id, contenido_html]);
            }
            
            await connection.commit();
            return { affectedRows: 1 };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    desactivar: async (id) => {
        const [resultado] = await pool.query('DELETE FROM publicaciones WHERE id = ?', [id]);
        return resultado;
    },
    cambiarEstado: async (id, estado) => {
        const [resultado] = await pool.query('UPDATE publicaciones SET estado = ? WHERE id = ?', [estado, id]);
        return resultado;
    }
};

module.exports = Publicacion;