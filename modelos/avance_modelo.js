// Importamos la conexión a la base de datos desde config/database.js
const db = require('../config_db/database');


// Creamos el objeto Avance con todas las operaciones CRUD sobre la tabla 'avance'
const Avance = {

     // Consultamos todos los avances y las fechas del trabajo asociado (solo del formulario 1)
    getAll: (callback) => {
        const query = `
            SELECT 
                avance.*, 
                trabajo.fecha_inicio, 
                trabajo.fecha_final
            FROM avance
            LEFT JOIN trabajo ON avance.fk_trabajo = trabajo.id;
            WHERE origen = 'formulario1';
        `;
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = `
            SELECT 
                avance.*, 
                trabajo.fecha_inicio, 
                trabajo.fecha_final
            FROM avance
            LEFT JOIN trabajo ON avance.fk_trabajo = trabajo.id
            WHERE avance.id = ? AND origen = 'formulario1';
        `;
        db.query(query, [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO avance (dias_completados, hectareas_terminadas, mes, origen, fk_trabajo) VALUES (?, ?, ?, ?, ?)', [data.dias_completados, data.hectareas_terminadas, data.mes, data.origen, data.fk_trabajo], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE avance SET dias_completados = ?, hectareas_terminadas = ?, mes = ?, fk_trabajo = ? WHERE id = ? AND origen = "formulario1" ', [data.dias_completados, data.hectareas_terminadas, data.mes, data.fk_trabajo, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM avance WHERE id = ? AND origen = "formulario1"', [id], callback);
    }
};

module.exports = Avance;