const db = require('../config_db/database');

const Finca = {
    getAll: (callback) => {
        const query = `
           SELECT 
                finca.*, 
                CONCAT(personas.nombres, ' ', personas.apellidos) AS persona_nombre_completo,
                dron.nombre AS dron_nombre
            FROM finca
            LEFT JOIN personas ON finca.fk_persona = personas.id
            LEFT JOIN dron ON finca.fk_dron = dron.id;
            WHERE finca.origen = 'formulario1';
        `;
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = `
            SELECT 
                finca.*, 
                CONCAT(personas.nombres, ' ', personas.apellidos) AS persona_nombre_completo,
                dron.nombre AS dron_nombre
            FROM finca
            LEFT JOIN personas ON finca.fk_persona = personas.id
            LEFT JOIN dron ON finca.fk_dron = dron.id
            WHERE finca.id = ? AND finca.origen = 'formulario1';
        `;
        db.query(query, [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO Finca (nombre, total_hectareas, ubicacion, origen, fk_persona, fk_dron) VALUES (?, ?, ?, ?, ?, ?)', [data.nombre, data.total_hectareas, data.ubicacion, data.origen, data.fk_persona, data.fk_dron], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE Finca SET nombre = ?, total_hectareas = ?, ubicacion = ?, fk_persona = ?, fk_dron = ? WHERE id = ? AND origen = "formulario1" ', [data.nombre, data.total_hectareas, data.ubicacion, data.fk_persona, data.fk_dron, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Finca WHERE id = ? AND origen = "formulario1"', [id], callback);
    },

    
    eliminarFincaConRelaciones: (id, callback) => {
        // 1. Obtener el ID del dron y la persona antes de borrar la finca
        const obtenerIDs = `SELECT fk_dron, fk_persona FROM finca WHERE id = ?`;
        
        db.query(obtenerIDs, [id], (err, results) => {
            if (err) return callback(err);
        
            if (results.length === 0) {
                return callback(new Error("No se encontró la finca con el ID proporcionado."));
            }
        
            const { fk_dron, fk_persona } = results[0];
        
                // 2. Eliminar avances relacionados con los trabajos de la finca
                const eliminarAvances = `DELETE FROM avance WHERE fk_trabajo IN (SELECT id FROM trabajo WHERE fk_finca = ?)`;
                db.query(eliminarAvances, [id], (err) => {
                        if (err) return callback(err);
        
                        // 3. Eliminar los trabajos de la finca
                        const eliminarTrabajos = `DELETE FROM trabajo WHERE fk_finca = ?`;
                        db.query(eliminarTrabajos, [id], (err) => {
                            if (err) return callback(err);
        
                            // 4. Eliminar la finca
                            const eliminarFinca = `DELETE FROM finca WHERE id = ?`;
                            db.query(eliminarFinca, [id], (err) => {
                                if (err) return callback(err);
        
                                // 5. Eliminar el dron si existe
                                if (fk_dron) {
                                    const eliminarDron = `DELETE FROM dron WHERE id = ?`;
                                    db.query(eliminarDron, [fk_dron], (err) => {
                                        if (err) return callback(err);
                                    });
                                }
        
                                // 6. Eliminar la persona si existe
                                if (fk_persona) {
                                    const eliminarPersona = `DELETE FROM personas WHERE id = ?`;
                                    db.query(eliminarPersona, [fk_persona], (err) => {
                                        if (err) return callback(err);
                                    });
                                }
        
                                // ✅ Todo se eliminó correctamente
                                callback(null, { message: "Finca y sus relaciones eliminadas correctamente" });
                            });
                        });
                    });
                });
            }
    
};

module.exports = Finca;