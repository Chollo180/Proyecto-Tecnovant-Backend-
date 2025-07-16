// Importamos la conexión a la base de datos
const db = require('../config_db/database');

// Definimos el objeto General con operaciones personalizadas para obtener y eliminar datos relacionados
const General = {

    // Función para obtener todos los datos consolidados desde múltiples tablas
    getAllData: (callback) => {
        const query = `
            SELECT 
                finca.id AS finca_id, 
                finca.nombre AS finca_nombre,
                finca.fk_persona, -- Incluye fk_persona
                personas.id AS persona_id,
                CONCAT(personas.nombres, ' ', personas.apellidos) AS persona_nombre_completo,
                trabajo.id AS trabajo_id,
                DATE_FORMAT(trabajo.fecha_inicio, '%Y-%m-%d') AS fecha_inicio,  
                DATE_FORMAT(trabajo.fecha_final, '%Y-%m-%d') AS fecha_final,
                trabajo.duracion,
                trabajo.progreso,
                trabajo.avance_total,
                avance.id AS avance_id,
                avance.dias_completados,
                avance.hectareas_terminadas,
                avance.mes 
            FROM finca
            LEFT JOIN personas ON finca.fk_persona = personas.id AND personas.origen = 'formulario1'
            LEFT JOIN dron ON finca.fk_dron = dron.id AND dron.origen = 'formulario1'
            LEFT JOIN trabajo ON trabajo.fk_finca = finca.id AND finca.origen = 'formulario1'
            LEFT JOIN avance ON avance.fk_trabajo = trabajo.id AND trabajo.origen = 'formulario1'
            WHERE finca.origen = 'formulario1';
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err);
                callback(err, null);
            } else {
                console.log("Datos obtenidos del backend:", results); //  Imprimir en la consola de Node.js
                callback(null, results);
            }
        });
    },

    // Función para eliminar una finca y sus relaciones en cascada
    eliminarRelaciones: (id, callback) => {

        // 1. Obtener el ID del dron y la persona antes de borrar la finca
        const obtenerIDs = `SELECT fk_persona FROM finca WHERE id = ?`;
        
        db.query(obtenerIDs, [id], (err, results) => {
            if (err) return callback(err);
        
            if (results.length === 0) {
                return callback(new Error("No se encontró la finca con el ID proporcionado."));
            }
        
            const { fk_persona } = results[0];
        
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
                                // 5. Eliminar la persona si existe
                                if (fk_persona) {
                                    const eliminarPersona = `DELETE FROM personas WHERE id = ?`;
                                    db.query(eliminarPersona, [fk_persona], (err) => {
                                        if (err) return callback(err);
                                    });
                                }
        
                                // Todo se eliminó correctamente
                                callback(null, { message: "Finca y sus relaciones eliminadas correctamente" });
                            });
                        });
                    });
                });
            },

            
};

module.exports = General;