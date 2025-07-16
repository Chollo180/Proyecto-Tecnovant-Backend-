// Importamos la conexión a la base de datos desde config_db/database.js
const db = require('../config_db/database');

// Definimos el objeto Finca con las operaciones CRUD necesarias
const Finca = {

    // Creamos un nuevo registro en la tabla 'finca'
    create: (data, callback) => {
        db.query('INSERT INTO Finca (nombre, origen, fk_persona) VALUES (?, ?, ?)', [data.nombre, data.origen, data.fk_persona], callback);
    },

    // Actualizamos los datos de una finca existente, filtrando por ID y origen 'formulario1'
    update: (id, data, callback) => {
        db.query('UPDATE Finca SET nombre = ?, fk_persona = ? WHERE id = ? AND origen = "formulario1" ', [data.nombre, data.fk_persona, id], callback);
    }
};

// Exportamos el objeto para ser utilizado desde el controlador finca_controllers.js
module.exports = Finca;