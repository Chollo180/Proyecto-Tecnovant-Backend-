const express = require('express');
const { getAllAvances, getAvanceById, createAvance, updateAvance, deleteAvance } = require('../controladores/avance_controllers');

const router = express.Router();

router.get('/', getAllAvances);
router.get('/:id', getAvanceById);
router.post('/', createAvance);
router.put('/:id', updateAvance);
router.delete('/:id', deleteAvance);

module.exports = router;