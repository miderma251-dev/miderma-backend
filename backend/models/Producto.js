const pool = require('../config/db');

const Producto = {
    // 1. Obtener todos (con filtros dinámicos incluyendo MARCA)
    obtenerTodos: async (filtros) => {
        let query = 'SELECT * FROM productos WHERE estado = 1';
        const values = [];

        if (filtros.categoria) {
            query += ' AND categoria = ?';
            values.push(filtros.categoria);
        }
        if (filtros.especialidad) {
            query += ' AND especialidad = ?';
            values.push(filtros.especialidad);
        }
        // NUEVO FILTRO DE MARCA
        if (filtros.marca) {
            query += ' AND marca = ?';
            values.push(filtros.marca);
        }
        if (filtros.oferta === 'true') {
            query += ' AND etiqueta_descuento IS NOT NULL';
        }
        if (filtros.precio_min) {
            query += ' AND precio >= ?';
            values.push(filtros.precio_min);
        }
        if (filtros.precio_max) {
            query += ' AND precio <= ?';
            values.push(filtros.precio_max);
        }

        const [rows] = await pool.query(query, values);
        return rows;
    },

    // 2. Obtener un solo producto por ID
    obtenerPorId: async (id) => {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ? AND estado = 1', [id]);
        return rows[0]; 
    },

    // 3. Crear un producto (Incluyendo Marca)
    crear: async (datos) => {
        const { nombre, descripcion, precio, stock, url_imagen_cloudinary, categoria, marca, especialidad, beneficios, etiqueta_descuento } = datos;
        const query = `
            INSERT INTO productos 
            (nombre, descripcion, precio, stock, url_imagen_cloudinary, categoria, marca, especialidad, beneficios, etiqueta_descuento) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [resultado] = await pool.query(query, [
            nombre, descripcion, precio, stock || 0, url_imagen_cloudinary, categoria, marca || 'Sin Marca', especialidad, beneficios, etiqueta_descuento
        ]);
        return resultado;
    },

    // 4. Actualizar un producto completo (PUT) (Incluyendo Marca)
    actualizar: async (id, datos) => {
        const { nombre, descripcion, precio, stock, url_imagen_cloudinary, categoria, marca, especialidad, beneficios, etiqueta_descuento } = datos;
        const query = `
            UPDATE productos SET 
            nombre = ?, descripcion = ?, precio = ?, stock = ?, url_imagen_cloudinary = ?, categoria = ?, marca = ?, especialidad = ?, beneficios = ?, etiqueta_descuento = ?
            WHERE id = ?
        `;
        const [resultado] = await pool.query(query, [
            nombre, descripcion, precio, stock, url_imagen_cloudinary, categoria, marca, especialidad, beneficios, etiqueta_descuento, id
        ]);
        return resultado;
    },

    registrarMovimiento: async (id_producto, cantidad, tipo_movimiento, motivo, usuario = 'admin') => {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();
            const operador = tipo_movimiento === 'salida' ? '-' : '+';
            const queryUpdate = `UPDATE productos SET stock = stock ${operador} ? WHERE id = ?`;
            await conexion.query(queryUpdate, [cantidad, id_producto]);
            const queryInsert = `
                INSERT INTO historial_inventario 
                (id_producto, tipo_movimiento, cantidad, motivo, usuario) 
                VALUES (?, ?, ?, ?, ?)
            `;
            await conexion.query(queryInsert, [id_producto, tipo_movimiento, cantidad, motivo, usuario]);
            await conexion.commit();
            return { exito: true, mensaje: 'Stock actualizado e historial guardado' };
        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    },

    obtenerHistorial: async (id_producto) => {
        const query = `SELECT * FROM historial_inventario WHERE id_producto = ? ORDER BY fecha_movimiento DESC`;
        const [rows] = await pool.query(query, [id_producto]);
        return rows;
    },

    desactivar: async (id) => {
        const [resultado] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        return resultado;
    }
};

module.exports = Producto;