// Importamos el paquete mysql2 para permitir la conexión con una base de datos MySQL
const mysql = require('mysql2');

// Creamos una conexión directa a la  base de datos con los parámetros necesarios
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cronogramaTecnovant'
});

// Iniciamos la conexión con la base de datos
database.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

module.exports = database;

