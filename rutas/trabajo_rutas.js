const express = require('express');
const { getAllTrabajos, getTrabajoById, createTrabajo, updateTrabajo, deleteTrabajo } = require('../controladores/trabajo_controllers');

const router = express.Router();

router.get('/', getAllTrabajos);
router.get('/:id', getTrabajoById);
router.post('/', createTrabajo);
router.put('/:id', updateTrabajo);
router.delete('/:id', deleteTrabajo);

module.exports = router;