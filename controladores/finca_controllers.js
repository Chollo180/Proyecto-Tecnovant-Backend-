// Importamos el finca_modelo que contiene las consultas SQL para la tabla 'finca'
const Finca = require('../modelos/finca_modelo');

// Controlador para crear una nueva finca
const createFinca = (req, res) => {
    const { nombre, origen, fk_persona} = req.body;
    Finca.create({ nombre, origen, fk_persona}, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombre, origen, fk_persona});
    });
};


// Controlador para actualizar una finca existente por su ID
const updateFinca = (req, res) => {
    const id = req.params.id;
    console.log("Datos recibidos en updateFinca:", req.body);
    const { nombre, origen, fk_persona} = req.body;
    Finca.update(id, { nombre, origen, fk_persona}, (err, results) => {
        if (err) {
            console.error("Error al actualizar finca:", err); // 👀 Ver error exacto
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, nombre, origen, fk_persona});
    });
};


// Exportamos las funciones para ser utilizadas en las rutas
module.exports = {
    createFinca,
    updateFinca
};