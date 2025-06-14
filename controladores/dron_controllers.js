const Dron = require('../modelos/dron_modelo');

const getAllDron = (req, res) => {
    Dron.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getDronById = (req, res) => {
    const id = req.params.id;
    Dron.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

const createDron = (req, res) => {
    const { nombre, capacidad_litros, total_hectrabajada_dia, origen } = req.body;
    Dron.create({ nombre, capacidad_litros, total_hectrabajada_dia, origen }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombre, capacidad_litros, total_hectrabajada_dia, origen });
    });
};

const updateDron = (req, res) => {
    const id = req.params.id;
    const { nombre, capacidad_litros, total_hectrabajada_dia } = req.body;
    Dron.update(id, { nombre, capacidad_litros, total_hectrabajada_dia }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, nombre, capacidad_litros, total_hectrabajada_dia });
    });
};

const deleteDron = (req, res) => {
    const id = req.params.id;
    Dron.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAllDron,
    getDronById,
    createDron,
    updateDron,
    deleteDron
};