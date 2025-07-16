// Importamos el modelo que contiene la lógica SQL para obtener y eliminar datos
const General = require('../modelos/general_modelo');

// Definimos el controlador con las funciones asociadas
const GeneralController = {
     
    // Función para obtener todos los datos organizados de finca, persona, trabajo y avances
    getAllData: (req, res) => {
        General.getAllData((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            
            // Creamos un mapa para organizar los datos por finca
            const fincasMap = new Map();

            rows.forEach(row => {
                // Si la finca no está en el mapa, la agregamos
                if (!fincasMap.has(row.finca_id)) {
                    fincasMap.set(row.finca_id, {
                        id: row.finca_id,
                        nombre: row.finca_nombre,
                        ubicacion: row.ubicacion,
                        total_hectareas: row.total_hectareas,
                        fk_persona: row.fk_persona,  
                        persona_nombre_completo: row.persona_nombre_completo,
                        trabajos: []// Arreglo para acumular trabajos de esta finca
                    });
                }

                const finca = fincasMap.get(row.finca_id);


                // Si existe un trabajo asociado, lo agrupamos dentro de la finca
                if (row.trabajo_id) {
                    let trabajo = finca.trabajos.find(t => t.id === row.trabajo_id);

                    // Si aún no se ha agregado ese trabajo, lo agregamos
                    if (!trabajo) {
                        trabajo = {
                            id: row.trabajo_id,
                            fecha_inicio: row.fecha_inicio,
                            fecha_final: row.fecha_final,
                            estado: row.estado,
                            duracion: row.duracion,
                            progreso: row.progreso,
                            avance_total: row.avance_total,
                            avances: [] // Arreglo para acumular avances de este trabajo
                        };
                        finca.trabajos.push(trabajo);
                    }

                    // Si hay un avance relacionado, lo agregamos al trabajo
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

            // Respondemos con un arreglo de fincas organizadas jerárquicamente
            res.json(Array.from(fincasMap.values()));
        });
    }
};


// Controlador para eliminar una finca y sus relaciones asociadas (trabajos, avances, personas)
const deleteRelaciones = (req, res) => {
    const id = req.params.id;
    console.log("ID recibido para eliminar:", id); 

    General.eliminarRelaciones(id, (err, results) => {
        if (err) {
            console.error("Error en SQL:", err); 
            return res.status(500).json({ error: "Error al eliminar la finca y sus relaciones", details: err.message });
        }
        res.status(200).json({ message: "Finca y relaciones eliminadas correctamente." });
    });
};

// Exportamos los métodos definidos
module.exports ={
    GeneralController,
    deleteRelaciones

} 
