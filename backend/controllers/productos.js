const Producto = require('../models/Producto'); // Importa el modelo en singular

// GET: Obtener todos los productos y aplicar filtros si existen
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.obtenerTodos(req.query);
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// GET: Obtener detalle de un producto específico
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.obtenerPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// POST: Crear un nuevo producto
const crearProducto = async (req, res) => {
    try {
        const resultado = await Producto.crear(req.body);
        res.status(201).json({ mensaje: 'Producto creado con éxito', id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// PUT: Actualizar toda la información de un producto
const actualizarProducto = async (req, res) => {
    try {
        const resultado = await Producto.actualizar(req.params.id, req.body);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado o sin cambios' });
        }
        res.json({ mensaje: 'Producto actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// DELETE: Desactivar un producto para que no se vea en la web
const desactivarProducto = async (req, res) => {
    try {
        const resultado = await Producto.desactivar(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado del catálogo con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

// ==========================================
// NUEVAS FUNCIONES PARA INVENTARIO E HISTORIAL
// ==========================================

// POST: Registrar un movimiento (entrada o salida de stock)
const registrarMovimiento = async (req, res) => {
    try {
        const id_producto = req.params.id;
        const { cantidad, tipo_movimiento, motivo, usuario } = req.body;

        if (!cantidad || !tipo_movimiento || !motivo) {
            return res.status(400).json({ error: 'Faltan datos obligatorios para el movimiento' });
        }

        if (tipo_movimiento !== 'entrada' && tipo_movimiento !== 'salida') {
            return res.status(400).json({ error: 'El tipo_movimiento debe ser "entrada" o "salida"' });
        }

        const resultado = await Producto.registrarMovimiento(id_producto, cantidad, tipo_movimiento, motivo, usuario);
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el movimiento de inventario' });
    }
};

// GET: Obtener el historial de un producto específico
const obtenerHistorialProducto = async (req, res) => {
    try {
        const historial = await Producto.obtenerHistorial(req.params.id);
        res.json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial del producto' });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    desactivarProducto,
    registrarMovimiento,
    obtenerHistorialProducto
};