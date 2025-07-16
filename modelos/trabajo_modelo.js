// Importamos la conexión a la base de datos desde config_db/database.js
const db = require('../config_db/database');

// Definimos el objeto Trabajo con las operaciones CRUD necesarias
const Trabajo = {

    // Creamos un nuevo registro en la tabla 'trabajo'
    create: (data, callback) => {
        db.query('INSERT INTO trabajo (fecha_inicio, fecha_final, duracion, progreso, avance_total, origen, fk_finca) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.fecha_inicio, data.fecha_final, data.duracion, data.progreso, data.avance_total, data.origen, data.fk_finca], callback);
    },
    // Actualizamos los datos de un trabajo existente, filtrando por ID y origen 'formulario1'
    update: (id, data, callback) => {
        db.query('UPDATE trabajo SET fecha_inicio = ?, fecha_final = ?, duracion = ?, progreso = ?, avance_total = ?, fk_finca = ? WHERE id = ? AND origen = "formulario1"', [data.fecha_inicio, data.fecha_final, data.duracion, data.progreso, data.avance_total, data.fk_finca, id], callback);
    }
};

// Exportamos el objeto para ser utilizado desde el controlador trabajo_controllers.js
module.exports = Trabajo;