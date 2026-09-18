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

// Nueva función para obtener los artículos relacionados
const obtenerPublicacionesRelacionadas = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoria } = req.query; // Lo mandaremos por query string
        res.json(await Publicacion.obtenerRelacionados(id, categoria));
    } catch (error) { res.status(500).json({ error: 'Error al obtener relacionados' }); }
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

const cambiarEstadoPublicacion = async (req, res) => {
    try {
        const { estado } = req.body;
        const resultado = await Publicacion.cambiarEstado(req.params.id, estado);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Estado cambiado' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (error) { res.status(500).json({ error: 'Error al cambiar estado' }); }
};

module.exports = { 
    obtenerPublicaciones, obtenerPublicacionPorId, obtenerPublicacionesRelacionadas, 
    crearPublicacion, actualizarPublicacion, desactivarPublicacion, cambiarEstadoPublicacion 
};