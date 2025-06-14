const db = require('../config_db/database');

const Persona = {
    getAll: (callback) => {
        db.query('SELECT * FROM personas WHERE origen = "formulario1"', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM personas WHERE id = ? AND origen = "formulario1"', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO personas (nombres, apellidos, origen) VALUES (?, ?, ?)', [data.nombres, data.apellidos, data.origen], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE personas SET nombres = ?, apellidos = ? WHERE id = ? AND origen = "formulario1"', [data.nombres, data.apellidos, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM personas WHERE id = ? AND origen = "formulario1"', [id], callback);
    }
};

module.exports = Persona;