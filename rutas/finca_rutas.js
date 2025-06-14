const express = require('express');
const { getAllFincas, getFincaById, createFinca, updateFinca, deleteFinca, deleteFincaConRelaciones } = require('../controladores/finca_controllers');

const router = express.Router();

router.get('/', getAllFincas);
router.get('/:id', getFincaById);
router.post('/', createFinca);
router.put('/:id', updateFinca);
router.delete('/:id', deleteFinca);
router.delete('/relaciones/:id', deleteFincaConRelaciones)

module.exports = router;