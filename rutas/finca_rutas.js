// Importamos Express para definir rutas HTTP
const express = require('express');
// Importamos las funciones de finca_controllers que manejan la lógica de creación y actualización
const { createFinca, updateFinca} = require('../controladores/finca_controllers');

// Creamos un router de Express para definir las rutas de finca
const router = express.Router();

// Ruta POST para crear una nueva finca
router.post('/', createFinca);
// Ruta PUT para actualizar una finca existente, usando su ID como parámetro
router.put('/:id', updateFinca);

// Exportamos el router para que sea utilizado en el archivo principal de rutas
module.exports = router;