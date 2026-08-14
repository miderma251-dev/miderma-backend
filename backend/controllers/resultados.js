const Resultado = require('../models/Resultado');

const obtenerResultados = async (req, res) => {
    try { res.json(await Resultado.obtenerTodos()); } 
    catch (error) { res.status(500).json({ error: 'Error al obtener casos' }); }
};

const obtenerResultadoPorId = async (req, res) => {
    try {
        const resultado = await Resultado.obtenerPorId(req.params.id);
        resultado ? res.json(resultado) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error interno' }); }
};

const crearResultado = async (req, res) => {
    try {
        const resDb = await Resultado.crear(req.body);
        res.status(201).json({ mensaje: 'Caso creado', id: resDb.insertId });
    } catch (error) { res.status(500).json({ error: 'Error al crear caso' }); }
};

const actualizarResultado = async (req, res) => {
    try {
        const resDb = await Resultado.actualizar(req.params.id, req.body);
        resDb.affectedRows > 0 ? res.json({ mensaje: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error al actualizar' }); }
};

const desactivarResultado = async (req, res) => {
    try {
        const resDb = await Resultado.desactivar(req.params.id);
        resDb.affectedRows > 0 ? res.json({ mensaje: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error al eliminar' }); }
};

const cambiarEstadoResultado = async (req, res) => {
    try {
        const { estado } = req.body;
        const resDb = await Resultado.cambiarEstado(req.params.id, estado);
        resDb.affectedRows > 0 ? res.json({ mensaje: 'Estado cambiado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error al cambiar estado' }); }
};

module.exports = { 
    obtenerResultados, obtenerResultadoPorId, crearResultado, 
    actualizarResultado, desactivarResultado, cambiarEstadoResultado 
};