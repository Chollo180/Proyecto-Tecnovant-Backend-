const Trabajo = require('../modelos/trabajo_modelo');

const getAllTrabajos = (req, res) => {
    Trabajo.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getTrabajoById = (req, res) => {
    const id = req.params.id;
    Trabajo.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

const createTrabajo = (req, res) => {
    const { fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, origen, fk_finca } = req.body;
    Trabajo.create({ fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, origen, fk_finca }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, origen, fk_finca });
    });
};

const updateTrabajo = (req, res) => {
    const id = req.params.id;
    const { fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, fk_finca } = req.body;

    console.log("Datos recibidos en la API:", { id, fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, fk_finca });
    Trabajo.update(id, { fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, fk_finca }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, fk_finca });
    });
};

const deleteTrabajo = (req, res) => {
    const id = req.params.id;
    Trabajo.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAllTrabajos,
    getTrabajoById,
    createTrabajo,
    updateTrabajo,
    deleteTrabajo
};