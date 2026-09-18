const express = require('express');
const router = express.Router();
const { getDoctores, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctores');

router.get('/', getDoctores);
router.get('/:id', getDoctorById);
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;