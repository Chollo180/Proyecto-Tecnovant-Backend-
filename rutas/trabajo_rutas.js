// Importamos Express para definir rutas HTTP
const express = require('express');
// Importamos las funciones de trabajo_controllers que manejan la lógica de creación y actualización
const {createTrabajo, updateTrabajo} = require('../controladores/trabajo_controllers');

// Creamos un router de Express para definir las rutas de trabajo
const router = express.Router();

// Ruta POST para crear un nuevo trabajo
router.post('/', createTrabajo);
// Ruta PUT para actualizar un trabajo existente, usando su ID como parámetro
router.put('/:id', updateTrabajo);

// Exportamos el router para que sea utilizado en el archivo principal de rutas
module.exports = router;