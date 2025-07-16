// Importamos el Express para definir rutas HTTP
const express = require('express');
// Importamos las funciones de persona_controllers que manejan la lógica de creación y actualización
const { createPersona, updatePersona} = require('../controladores/persona_controllers');

// Creamos un router de Express para definir las rutas de una persona
const router = express.Router();


// Ruta POST para crear una nueva persona
router.post('/', createPersona);
// Ruta PUT para actualizar una persona existente, usando su ID como parámetro
router.put('/:id', updatePersona);

// Exportamos el router para que sea utilizado en el archivo principal de rutas
module.exports = router;