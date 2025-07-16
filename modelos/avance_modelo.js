// Importamos la conexión a la base de datos desde config_db/database.js
const db = require('../config_db/database');


// Definimos el objeto Avance con las operaciones CRUD necesarias
const Avance = {

     // Creamos un nuevo registro en la tabla 'avance'
    create: (data, callback) => {
        db.query('INSERT INTO avance (dias_completados, hectareas_terminadas, mes, origen, fk_trabajo) VALUES (?, ?, ?, ?, ?)', [data.dias_completados, data.hectareas_terminadas, data.mes, data.origen, data.fk_trabajo], callback);
    },

    // Actualizamos los datos de un avance existente, filtrando por ID y origen 'formulario1'
    update: (id, data, callback) => {
        db.query('UPDATE avance SET dias_completados = ?, hectareas_terminadas = ?, mes = ?, fk_trabajo = ? WHERE id = ? AND origen = "formulario1" ', [data.dias_completados, data.hectareas_terminadas, data.mes, data.fk_trabajo, id], callback);
    }
    
};


// Exportamos el objeto para ser utilizado desde el controlador avance_controllers.js
module.exports = Avance;