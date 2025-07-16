// Importamos los módulos principales de Express y CORS
const express = require('express');
const cors = require('cors');

// Importamos los archivos de rutas (formulario1)
const fincaRoutes = require('./rutas/finca_rutas');
const personaRoutes = require('./rutas/persona_rutas');
const trabajoRoutes = require('./rutas/trabajo_rutas');
const avanceRoutes = require('./rutas/avance_rutas');
const generalRoutes = require('./rutas/general_rutas');

// Importamos rutas del segundo formulario (formulario2)
const programacionRoutes = require('./rutas/programacion_rutas')

// Creamos una instancia de la aplicación Express
const app = express();

// Activamos el middleware CORS para permitir solicitudes entre dominios
app.use(cors());

// Middleware para parsear datos JSON en las solicitudes entrantes
app.use(express.json());

// Ruta raíz para verificar si el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Backend funcionando correctamente');
});


// Middleware de rutas para el formulario 1
app.use('/finca', fincaRoutes);
app.use('/persona', personaRoutes);
app.use('/trabajo', trabajoRoutes);
app.use('/avance', avanceRoutes);
app.use('/api', generalRoutes);

// Middleware de rutas para el formulario (formulario2)
app.use('/programacion', programacionRoutes);

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 5000;


// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});