const General = require('../modelos/general_modelo');

const GeneralController = {
    getAllData: (req, res) => {
        General.getAllData((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            // Transformar los datos en una estructura más ordenada
            const fincasMap = new Map();

            rows.forEach(row => {
                if (!fincasMap.has(row.finca_id)) {
                    fincasMap.set(row.finca_id, {
                        id: row.finca_id,
                        nombre: row.finca_nombre,
                        ubicacion: row.ubicacion,
                        total_hectareas: row.total_hectareas,
                        fk_persona: row.fk_persona,  // ✅ Agregar ID de la persona
                        persona_nombre_completo: row.persona_nombre_completo,
                        fk_dron: row.fk_dron,        // ✅ Agregar ID del dron
                        dron_nombre: row.dron_nombre,
                        trabajos: []
                    });
                }

                const finca = fincasMap.get(row.finca_id);

                if (row.trabajo_id) {
                    let trabajo = finca.trabajos.find(t => t.id === row.trabajo_id);
                    if (!trabajo) {
                        trabajo = {
                            id: row.trabajo_id,
                            fecha_inicio: row.fecha_inicio,
                            fecha_final: row.fecha_final,
                            estado: row.estado,
                            duracion: row.duracion,
                            progreso: row.progreso,
                            avance_total: row.avance_total,
                            avances: []
                        };
                        finca.trabajos.push(trabajo);
                    }

                    if (row.avance_id) {
                        trabajo.avances.push({
                            id: row.avance_id,
                            dias_completados: row.dias_completados,
                            hectareas_terminadas: row.hectareas_terminadas,
                            mes: row.mes
                        });
                    }
                }
            });

            res.json(Array.from(fincasMap.values()));
        });
    }
};

module.exports = GeneralController;
