const mysql = require('mysql');
const express = require('express');
const bp = require('body-parser');

// Crear el servidor de express
const app = express();

// Configurar el middleware para parsear JSON
app.use(bp.json());

// Configuración de la conexión a MySQL
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1700PAC12025Equi3#49',
    database: '1700PAC12025Equi3',
    multipleStatements: true
});

// Conectar a la base de datos
mysqlConnection.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos:', err);
        process.exit(1); // Detiene el servidor si no se conecta a la base de datos
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Importa el router para las rutas relacionadas con personas
const personaRouter = require('./modulo_personas');
app.use('/', personaRouter);

// Configura el servidor para escuchar en el puerto 3000
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));

module.exports = { mysqlConnection }; // Exporta la conexión para su uso en otros archivos
