// Importamos el avance_modelo que contiene las consultas SQL para la tabla 'avance'
const Avance = require('../modelos/avance_modelo');


// Controlador para crear un nuevo avance
const createAvance = (req, res) => {
    const { dias_completados, hectareas_terminadas, mes, origen, fk_trabajo } = req.body;
    Avance.create({ dias_completados, hectareas_terminadas, mes, origen, fk_trabajo }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, dias_completados, hectareas_terminadas, mes, origen, fk_trabajo });
    });
};


// Controlador para actualizar un avance existente por su ID
const updateAvance = (req, res) => {
    const id = req.params.id;
    const { dias_completados, hectareas_terminadas, mes, origen, fk_trabajo } = req.body;
    Avance.update(id, { dias_completados, hectareas_terminadas, mes, origen, fk_trabajo }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, dias_completados, hectareas_terminadas, mes, origen, fk_trabajo });
    });
};



// Exportamos las funciones para ser utilizadas en las rutas
module.exports = {
    createAvance,
    updateAvance
};