const Paquete = require('../models/Paquete');

const obtenerPaquetes = async (req, res) => {
    try { res.json(await Paquete.obtenerTodos()); } 
    catch (error) { res.status(500).json({ error: 'Error al obtener paquetes' }); }
};

const obtenerPaquetePorId = async (req, res) => {
    try {
        const paquete = await Paquete.obtenerPorId(req.params.id);
        paquete ? res.json(paquete) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error interno' }); }
};

const crearPaquete = async (req, res) => {
    try {
        const resultado = await Paquete.crear(req.body);
        res.status(201).json({ mensaje: 'Creado', id: resultado.insertId });
    } catch (error) { res.status(500).json({ error: 'Error al crear' }); }
};

const actualizarPaquete = async (req, res) => {
    try {
        const resultado = await Paquete.actualizar(req.params.id, req.body);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error al actualizar' }); }
};

const desactivarPaquete = async (req, res) => {
    try {
        const resultado = await Paquete.desactivar(req.params.id);
        resultado.affectedRows > 0 ? res.json({ mensaje: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) { res.status(500).json({ error: 'Error al eliminar' }); }
};

module.exports = { obtenerPaquetes, obtenerPaquetePorId, crearPaquete, actualizarPaquete, desactivarPaquete };