const db = require('../config_db/database');

const Dron = {
    getAll: (callback) => {
        db.query('SELECT * FROM dron WHERE origen = "formulario"', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM dron WHERE id = ? AND origen = "formulario2"', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO dron (nombre, capacidad_litros, total_hectrabajada_dia, origen) VALUES (?, ?, ?, ?)', [data.nombre, data.capacidad_litros, data.total_hectrabajada_dia, data.origen], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE dron SET nombre = ?, capacidad_litros = ?, total_hectrabajada_dia = ? WHERE id = ? AND origen = "formulario1', [data.nombre, data.capacidad_litros, data.total_hectrabajada_dia, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM dron WHERE id = ? AND origen = "formulario1"', [id], callback);
    }
};

module.exports = Dron;