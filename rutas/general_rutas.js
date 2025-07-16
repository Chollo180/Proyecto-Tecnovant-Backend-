// Importamos Express para crear las rutas
const express = require('express');
// Creamos un router de Express para definir las rutas
const router = express.Router();
// Importamos las funciones de general_controllers
const {GeneralController, deleteRelaciones} = require('../controladores/general_controllers');

// Ruta GET para obtener todos los datos organizados de finca, personas, trabajos y avances
router.get('/todo', GeneralController.getAllData);
// Ruta DELETE para eliminar una finca y sus relaciones (personas, trabajos, avances)
router.delete('/relaciones/:id', deleteRelaciones)

// Exportamos el router para que sea utilizado en el archivo principal de rutas
module.exports = router;