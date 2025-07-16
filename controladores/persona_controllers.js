// Importamos el persona_modelo que contiene las consultas SQL para la tabla 'personas'
const Persona = require('../modelos/persona_modelo');

// Controlador para crear una nueva persona
const createPersona = (req, res) => {
    const { nombres, apellidos, origen } = req.body;
    Persona.create({ nombres, apellidos, origen }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombres, apellidos, origen });
    });
};


// Controlador para actualizar una persona existente por su ID
const updatePersona = (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, origen} = req.body;
    console.log("Datos recibidos en la API:", { id, nombres, apellidos, origen}); // 🛠️ Debugging
    if (!nombres) {
        return res.status(400).json({ error: "El campo 'nombres' es obligatorio" });
    }
    Persona.update(id, { nombres, apellidos, origen}, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, nombres, apellidos, origen});
    });
};

// Exportamos las funciones para ser utilizadas en las rutas
module.exports = {
    createPersona,
    updatePersona
};