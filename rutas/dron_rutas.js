const express = require('express');
const { getAllDron, getDronById, createDron, updateDron, deleteDron } = require('../controladores/dron_controllers');

const router = express.Router();

router.get('/', getAllDron);
router.get('/:id', getDronById);
router.post('/', createDron);
router.put('/:id', updateDron);
router.delete('/:id', deleteDron);

module.exports = router;