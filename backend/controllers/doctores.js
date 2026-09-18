const Doctor = require('../models/Doctor');

exports.getDoctores = async (req, res) => {
    try {
        const doctores = await Doctor.getAll();
        // Convertimos el JSON de la BD de vuelta a un arreglo para React
        doctores.forEach(doc => {
            if (typeof doc.post_grados === 'string') {
                doc.post_grados = JSON.parse(doc.post_grados);
            }
        });
        res.json(doctores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los doctores' });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.getById(req.params.id);
        if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });
        
        if (typeof doctor.post_grados === 'string') {
            doctor.post_grados = JSON.parse(doctor.post_grados);
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el doctor' });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const nuevoId = await Doctor.create(req.body);
        res.status(201).json({ message: 'Doctor registrado con éxito', id: nuevoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el doctor' });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const affectedRows = await Doctor.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ error: 'Doctor no encontrado' });
        res.json({ message: 'Doctor actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el doctor' });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const affectedRows = await Doctor.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ error: 'Doctor no encontrado' });
        res.json({ message: 'Doctor eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el doctor' });
    }
};