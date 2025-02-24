//Constante para el paquete de MYSQL
const mysql = require('mysql');
//Constante para el paquete Express
const express = require('express');
//Constante para los metodos de express.
var app = express();
//Constante para el paquete de bodyparser.
const bp = require('body-parser');


//Enviando los datos JSON a NODEJS API
app.use(bp.json());

// conectar a la base de datos (MYSQL)
const mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: '1700PAC12025Equi3',
    multipleStatements: true


});

// Test de conexion abase de datos
mysqlConnection.connect((err)=>{
    if (err){
        console.log('Conexion exitosa');
    } else { 
        console.log('Error al conectar la base.');
    }
});

// Ejecutar el server en un puerto especifico.
app.listen(3000,()=> console.log('Server running puerto: 3000'));

