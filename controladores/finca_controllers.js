const Finca = require('../modelos/finca_modelo');

const getAllFincas = (req, res) => {
    Finca.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getFincaById = (req, res) => {
    const id = req.params.id;
    Finca.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

const createFinca = (req, res) => {
    const { nombre, total_hectareas, ubicacion, origen, fk_persona, fk_dron } = req.body;
    Finca.create({ nombre, total_hectareas, ubicacion, origen, fk_persona, fk_dron }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombre, total_hectareas, ubicacion, origen, fk_persona, fk_dron });
    });
};

const updateFinca = (req, res) => {
    const id = req.params.id;
    console.log("Datos recibidos en updateFinca:", req.body);
    const { nombre, total_hectareas, ubicacion, fk_persona, fk_dron } = req.body;
    Finca.update(id, { nombre, total_hectareas, ubicacion, fk_persona, fk_dron }, (err, results) => {
        if (err) {
            console.error("Error al actualizar finca:", err); // 👀 Ver error exacto
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, nombre, total_hectareas, ubicacion, fk_persona, fk_dron });
    });
};

const deleteFinca = (req, res) => {
    const id = req.params.id;
    Finca.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

const deleteFincaConRelaciones = (req, res) => {
    const id = req.params.id;
    console.log("ID recibido para eliminar:", id); // 👀 Verifica qué ID llega

    Finca.eliminarFincaConRelaciones(id, (err, results) => {
        if (err) {
            console.error("Error en SQL:", err); // 👀 Esto mostrará el error exacto en la terminal
            return res.status(500).json({ error: "Error al eliminar la finca y sus relaciones", details: err.message });
        }
        res.status(200).json({ message: "Finca y relaciones eliminadas correctamente." });
    });
};

module.exports = {
    getAllFincas,
    getFincaById,
    createFinca,
    updateFinca,
    deleteFinca,
    deleteFincaConRelaciones
};