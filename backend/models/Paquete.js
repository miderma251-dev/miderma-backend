const pool = require('../config/db');

const Paquete = {
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM paquetes WHERE estado = 1 ORDER BY fecha_creacion DESC');
        return rows;
    },
    obtenerPorId: async (id) => {
        const [rows] = await pool.query('SELECT * FROM paquetes WHERE id = ? AND estado = 1', [id]);
        return rows[0];
    },
    crear: async (datos) => {
        const { titulo, subtitulo, descripcion, precioAntes, precioAhora, validez, url_imagen } = datos;
        const query = `INSERT INTO paquetes (titulo, subtitulo, descripcion, precioAntes, precioAhora, validez, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        // CORREGIDO AQUÍ: Agregué 'validez' en el arreglo que estaba faltando
        const [resultado] = await pool.query(query, [titulo, subtitulo, descripcion, precioAntes, precioAhora, validez, url_imagen]);
        
        return resultado;
    },
    actualizar: async (id, datos) => {
        const { titulo, subtitulo, descripcion, precioAntes, precioAhora, validez, url_imagen } = datos;
        const query = `UPDATE paquetes SET titulo = ?, subtitulo = ?, descripcion = ?, precioAntes = ?, precioAhora = ?, validez = ?, url_imagen = ? WHERE id = ?`;
        const [resultado] = await pool.query(query, [titulo, subtitulo, descripcion, precioAntes, precioAhora, validez, url_imagen, id]);
        return resultado;
    },
    desactivar: async (id) => {
        // En vez de borrar físico (DELETE), cambiamos el estado a 0 (oculto)
        const [resultado] = await pool.query('UPDATE paquetes SET estado = 0 WHERE id = ?', [id]);
        return resultado;
    }
};

module.exports = Paquete;