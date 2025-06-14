const db = require('../config_db/database');

const Trabajo = {
    getAll: (callback) => {
        const query = `
            SELECT 
                trabajo.id,
                DATE_FORMAT(trabajo.fecha_inicio, '%Y-%m-%d') AS fecha_inicio,  
                DATE_FORMAT(trabajo.fecha_final, '%Y-%m-%d') AS fecha_final,    
                trabajo.estado,
                trabajo.duracion,
                trabajo.progreso,
                trabajo.avance_total,
                finca.nombre AS finca_nombre
            FROM trabajo
            LEFT JOIN finca ON trabajo.fk_finca = finca.id;}
            WHERE origen = 'formulario1';
            
        `;
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = `
            SELECT 
                trabajo.id,
                DATE_FORMAT(trabajo.fecha_inicio, '%Y-%m-%d') AS fecha_inicio,
                DATE_FORMAT(trabajo.fecha_final, '%Y-%m-%d') AS fecha_final,
                trabajo.estado,
                trabajo.duracion,
                trabajo.progreso,
                trabajo.avance_total,
                finca.nombre AS finca_nombre
            FROM trabajo
            LEFT JOIN finca ON trabajo.fk_finca = finca.id
            WHERE trabajo.id = ? AND origen = 'formulario1';
            
        `;
        db.query(query, [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO trabajo (fecha_inicio, fecha_final, estado, duracion, progreso, avance_total, origen, fk_finca) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.fecha_inicio, data.fecha_final, data.estado, data.duracion, data.progreso, data.avance_total, data.origen, data.fk_finca], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE trabajo SET fecha_inicio = ?, fecha_final = ?, estado = ?, duracion = ?, progreso = ?, avance_total = ?, fk_finca = ? WHERE id = ? AND origen = "formulario1"', [data.fecha_inicio, data.fecha_final, data.estado, data.duracion, data.progreso, data.avance_total, data.fk_finca, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM trabajo WHERE id = ? AND origen = "formulario1"', [id], callback);
    }
};

module.exports = Trabajo;