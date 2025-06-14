const db = require('../config_db/database');

const General = {
    getAllData: (callback) => {
        const query = `
            SELECT 
                finca.id AS finca_id, 
                finca.nombre AS finca_nombre, 
                finca.total_hectareas,
                finca.ubicacion,
                finca.fk_persona, -- Incluye fk_persona
                finca.fk_dron, -- Incluye fk_dron
                personas.id AS persona_id,
                CONCAT(personas.nombres, ' ', personas.apellidos) AS persona_nombre_completo,        
                dron.id AS dron_id,
                dron.nombre AS dron_nombre,
                trabajo.id AS trabajo_id,
                DATE_FORMAT(trabajo.fecha_inicio, '%Y-%m-%d') AS fecha_inicio,  
                DATE_FORMAT(trabajo.fecha_final, '%Y-%m-%d') AS fecha_final,    
                trabajo.estado,
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
                console.error("❌ Error ejecutando la consulta:", err);
                callback(err, null);
            } else {
                console.log("✅ Datos obtenidos del backend:", results); // 👉 Imprimir en la consola de Node.js
                callback(null, results);
            }
        });
    }
};

module.exports = General;