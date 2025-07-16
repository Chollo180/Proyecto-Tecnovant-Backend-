// Importamos el trabajo_modelo que contiene las consultas SQL para la tabla 'finca'
const Trabajo = require('../modelos/trabajo_modelo');

// Controlador para crear un nuevo trabajo
const createTrabajo = (req, res) => {
    const { fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca } = req.body;
    Trabajo.create({ fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca });
    });
};

// Controlador para actualizar un trabajo existente por su ID
const updateTrabajo = (req, res) => {
    const id = req.params.id;
    const { fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca } = req.body;
    console.log("Datos recibidos en la API:", { id, fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca });
    Trabajo.update(id, { fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca });
    });
};

// Exportamos las funciones para ser utilizadas en las rutas
module.exports = {
    createTrabajo,
    updateTrabajo
};