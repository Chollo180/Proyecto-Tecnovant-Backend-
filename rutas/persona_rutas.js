const express = require('express');
const { getAllPersonas, getPersonaById, createPersona, updatePersona, deletePersona } = require('../controladores/persona_controllers');

const router = express.Router();

router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);
router.post('/', createPersona);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);

module.exports = router;