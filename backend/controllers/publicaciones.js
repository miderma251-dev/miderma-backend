const Publicacion = require('../models/Publicacion');

const obtenerPublicaciones = async (req, res) => {
    try { res.json(await Publicacion.obtenerTodos()); } 
    catch (error) { res.status(500).json({ error: 'Error al obtener publicaciones' }); }
};

const obtenerPublicacionPorId = async (req, res) => {
    try {
        const pub = await Publicacion.obtenerPorId(req.params.id);
        pub ? res.json(pub) : res.status(404).json({ error: 'No encontrada' });
    } catch (error) { res.status(500).json({ error: 'Error interno' }); }
};

const crearPublicacion = async (req, res) => {
    try {
        const resultado = await Publicacion.crear(req.body);
        res.status(201).json({ mensaje: 'Creada', id: resultado.insertId });
    } catch (error) { res.status(500).json({ error: 'Error al crear' }); }
};

const actualizarPublicacion = async (req, res) => {
    try {
        const resultado = await Publicacion.actualizar(req.params.id, req.body);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Actualizada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (error) { res.status(500).json({ error: 'Error al actualizar' }); }
};

const desactivarPublicacion = async (req, res) => {
    try {
        const resultado = await Publicacion.desactivar(req.params.id);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Eliminada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (error) { res.status(500).json({ error: 'Error al eliminar' }); }
};

// NUEVA FUNCIÓN CONTROLADOR
const cambiarEstadoPublicacion = async (req, res) => {
    try {
        const { estado } = req.body;
        const resultado = await Publicacion.cambiarEstado(req.params.id, estado);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Estado cambiado' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (error) { res.status(500).json({ error: 'Error al cambiar estado' }); }
};

// Asegúrate de exportar la nueva función al final
module.exports = { 
    obtenerPublicaciones, obtenerPublicacionPorId, crearPublicacion, 
    actualizarPublicacion, desactivarPublicacion, cambiarEstadoPublicacion 
};