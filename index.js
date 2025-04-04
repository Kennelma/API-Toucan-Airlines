//Constante para el paquete Express
const express = require('express');
//constante para los metodos de express.
var  app = express();
//constante para el paquete de bodyparser.
const bp = require('body-parser');

//Se importa la conexion desde conexion_BD.js
const mysqlConnection = require('./conexion_BD'); //se importa la conexion de la base de datos

//Enviando los datos JSON a NODEJS API
app.use(bp.json());

//IMPORTACION DE LAS RUTAS DE LOS MODULOS
const personasRoutes = require('./modulo_personas');
app.use('/ModuloPersonas', personasRoutes); //usa esto como base de rutas

const notificacionesRoutes = require('./modulo_notificaciones');
app.use('/ModuloNotificaciones', notificacionesRoutes); //usa esto como base de rutas

const reservasRoutes = require('./modulo_reservas');
app.use('/ModuloReservas', reservasRoutes); //usa esto como base de rutas

const reportesRoutes = require('./modulo_reportes');
app.use('/ModuloReportes', reportesRoutes); //usa esto como base de rutas

const facturasRoutes = require('./modulo_facturas');
app.use('/ModuloFactura', facturasRoutes);


// Ejecutar el server en un puerto especifico.
app.listen(3000,()=> console.log('server Running puerto: 3000'));

