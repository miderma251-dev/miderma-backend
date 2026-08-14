const pool = require('../config/db');

const Paquete = {
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM paquetes WHERE estado = 1');
        return rows;
    },
    obtenerPorId: async (id) => {
        const [rows] = await pool.query('SELECT * FROM paquetes WHERE id = ? AND estado = 1', [id]);
        return rows[0];
    },
    crear: async (datos) => {
        const { nombre_paquete, descripcion, cantidad_sesiones, precio_total, url_imagen, categoria, mas_elegido } = datos;
        const query = `INSERT INTO paquetes (nombre_paquete, descripcion, cantidad_sesiones, precio_total, url_imagen, categoria, mas_elegido) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [resultado] = await pool.query(query, [nombre_paquete, descripcion, cantidad_sesiones, precio_total, url_imagen, categoria, mas_elegido || false]);
        return resultado;
    },
    actualizar: async (id, datos) => {
        const { nombre_paquete, descripcion, cantidad_sesiones, precio_total, url_imagen, categoria, mas_elegido } = datos;
        const query = `UPDATE paquetes SET nombre_paquete = ?, descripcion = ?, cantidad_sesiones = ?, precio_total = ?, url_imagen = ?, categoria = ?, mas_elegido = ? WHERE id = ?`;
        const [resultado] = await pool.query(query, [nombre_paquete, descripcion, cantidad_sesiones, precio_total, url_imagen, categoria, mas_elegido, id]);
        return resultado;
    },
    desactivar: async (id) => {
        const [resultado] = await pool.query('DELETE FROM paquetes WHERE id = ?', [id]);
        return resultado;
    }
};

module.exports = Paquete;