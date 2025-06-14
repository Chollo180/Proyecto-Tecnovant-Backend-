const Avance = require('../modelos/avance_modelo');

const getAllAvances = (req, res) => {
    Avance.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getAvanceById = (req, res) => {
    const id = req.params.id;
    Avance.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

const createAvance = (req, res) => {
    const { dias_completados, hectareas_terminadas, mes, fk_trabajo } = req.body;
    Avance.create({ dias_completados, hectareas_terminadas, mes, fk_trabajo }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, dias_completados, hectareas_terminadas, mes, fk_trabajo });
    });
};

const updateAvance = (req, res) => {
    const id = req.params.id;
    const { dias_completados, hectareas_terminadas, mes, fk_trabajo } = req.body;
    Avance.update(id, { dias_completados, hectareas_terminadas, mes, fk_trabajo }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, dias_completados, hectareas_terminadas, mes, fk_trabajo });
    });
};

const deleteAvance = (req, res) => {
    const id = req.params.id;
    Avance.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAllAvances,
    getAvanceById,
    createAvance,
    updateAvance,
    deleteAvance
};