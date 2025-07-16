// Importamos Express para definir rutas HTTP
const express = require('express');
// Importamos las funciones de avance_controllers que manejan la lógica de creación y actualización
const { createAvance, updateAvance } = require('../controladores/avance_controllers');

// Creamos un router de Express para definir las rutas de avance
const router = express.Router();

// Ruta POST para crear un nuevo avance
router.post('/', createAvance);
// Ruta PUT para actualizar un avance existente, usando su ID como parámetro
router.put('/:id', updateAvance);


// Exportamos el router para que sea utilizado en el archivo principal de rutas
module.exports = router;