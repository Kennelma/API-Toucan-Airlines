// constante para el paquete de MYSQL
const mysql = require('mysql');
// constante para el paquete Express
const express = require('express');
//cnstante para los metodos de express.
var  app = express();
//constante para el paquete de bodyparser.
const bp = require('body-parser');

//Enviando los datos JSON a NODEJS API
app.use(bp.json());

// conectar a la base de datos (MYSQL)
var mysqlConnection = mysql.createConnection({
    host: '142.44.161.115',
    user: '1700PAC12025Equi3',
    port: 3306,
    password: '1700PAC12025Equi3#49',
    database: '1700PAC12025Equi3',
    multipleStatements: true
});

// Test de conexion abase de datos
mysqlConnection.connect((err)=>{
    if (!err){
        console.log('Conexion Exitosa');
    } else { 
        console.log('Error al conectar la base de datos', err.message);
    }
});

//IMPORTACION DE LAS RUTAS DEL MODULO PERSONAS
const personasRoutes = require('./modulo_personas');
app.use('/ModuloPersonas', personasRoutes); //usa esto como base de rutas

// Importamos las rutas del modulo notificaciones
const notificacionRoutes = require('./modulo_notificaciones');
// Usamos las rutas de notificaciones
app.use('/ModuloNotificaciones', notificacionRoutes);

// Ejecutar el server en un puerto especifico.
app.listen(3000,()=> console.log('server Running puerto: 3000'));