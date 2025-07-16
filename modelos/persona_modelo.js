// Importamos la conexión a la base de datos desde config_db/database.js
const db = require('../config_db/database');

// Definimos el objeto Personas con las operaciones CRUD necesarias
const Persona = {

    // Creamos un nuevo registro en la tabla 'personas'
    create: (data, callback) => {
        db.query('INSERT INTO personas (nombres, apellidos, origen) VALUES (?, ?, ?)', [data.nombres, data.apellidos, data.origen], callback);
    },
    // Actualizamos los datos de una persona existente, filtrando por ID y origen 'formulario1'
    update: (id, data, callback) => {
        db.query('UPDATE personas SET nombres = ?, apellidos = ? WHERE id = ? AND origen = "formulario1"', [data.nombres, data.apellidos, id], callback);
    }
};

// Exportamos el objeto para ser utilizado desde el controlador persona_controllers.js
module.exports = Persona;