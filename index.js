const express = require('express');
const cors = require('cors');
const fincaRoutes = require('./rutas/finca_rutas');
const personaRoutes = require('./rutas/persona_rutas');
const dronRoutes = require('./rutas/dron_rutas');
const trabajoRoutes = require('./rutas/trabajo_rutas');
const avanceRoutes = require('./rutas/avance_rutas');
const generalRoutes = require('./rutas/general_rutas');
const programacionRoutes = require('./rutas/programacion_rutas')

const app = express();

// Configurar CORS
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend funcionando correctamente');
});


app.get('/general', (req, res) => {
    General.getAllData((err, results) => {
        if (err) {
            res.status(500).json({ error: "Error obteniendo los datos" });
        } else {
            console.log("✅ Datos enviados por la API:");
            console.log(JSON.stringify(results, null, 2)); // 👉 Muestra los datos con formato JSON
            res.json(results);
        }
    });
});

app.use('/finca', fincaRoutes);
app.use('/persona', personaRoutes);
app.use('/dron', dronRoutes);
app.use('/trabajo', trabajoRoutes);
app.use('/avance', avanceRoutes);
app.use('/api', generalRoutes);
app.use('/programacion', programacionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});