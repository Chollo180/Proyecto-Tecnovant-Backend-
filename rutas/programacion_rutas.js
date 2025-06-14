const express = require('express');
const router = express.Router();
const programacionController = require('../controladores/programacion_controller');

// Rutas para crear
router.post('/finca', programacionController.crearFinca);
router.post('/personas', programacionController.crearPersona);
router.post('/trabajo', programacionController.crearTrabajo);
router.post('/dron', programacionController.crearDron);
router.post('/factura', programacionController.crearFactura);
router.post('/avance', programacionController.crearAvance);

// Ruta para leer
router.get('/programaciones', programacionController.obtenerProgramaciones);

// Rutas para actualizar
router.put('/finca/:id', programacionController.actualizarFinca);
router.put('/personas/:id', programacionController.crearPersona);
router.put('/dron/:id', programacionController.crearDron);
router.put('/trabajo/:id', programacionController.actualizarTrabajo);
router.put('/factura/:id', programacionController.actualizarFactura);
router.put('/avance/:id', programacionController.actualizarAvance);

// Ruta para eliminar
router.delete('/programaciones/relacionada/:id', programacionController.eliminarProgramacion);

module.exports = router;