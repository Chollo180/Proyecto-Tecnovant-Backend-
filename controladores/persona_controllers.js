const Persona = require('../modelos/persona_modelo');

const getAllPersonas = (req, res) => {
    Persona.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getPersonaById = (req, res) => {
    const id = req.params.id;
    Persona.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
};

const createPersona = (req, res) => {
    const { nombres, apellidos, origen } = req.body;
    Persona.create({ nombres, apellidos, origen }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nombres, apellidos, origen });
    });
};

const updatePersona = (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos} = req.body;

    console.log("Datos recibidos en la API:", { id, nombres, apellidos}); // 🛠️ Debugging

    if (!nombres) {
        return res.status(400).json({ error: "El campo 'nombres' es obligatorio" });
    }

    Persona.update(id, { nombres, apellidos}, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, nombres, apellidos});
    });
};


const deletePersona = (req, res) => {
    const id = req.params.id;
    Persona.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAllPersonas,
    getPersonaById,
    createPersona,
    updatePersona,
    deletePersona
};