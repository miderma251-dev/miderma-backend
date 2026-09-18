const pool = require('../config/db');

const Doctor = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM doctores');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM doctores WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nombre, genero, especialidad, cmp, rne, titulo_profesional, post_grados, url_foto } = data;
        const [result] = await pool.query(
            'INSERT INTO doctores (nombre, genero, especialidad, cmp, rne, titulo_profesional, post_grados, url_foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, genero, especialidad, cmp, rne, titulo_profesional, JSON.stringify(post_grados), url_foto]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { nombre, genero, especialidad, cmp, rne, titulo_profesional, post_grados, url_foto } = data;
        const [result] = await pool.query(
            'UPDATE doctores SET nombre=?, genero=?, especialidad=?, cmp=?, rne=?, titulo_profesional=?, post_grados=?, url_foto=? WHERE id=?',
            [nombre, genero, especialidad, cmp, rne, titulo_profesional, JSON.stringify(post_grados), url_foto, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM doctores WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Doctor;