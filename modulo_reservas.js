const mysql = require('mysql');
const express = require('express');
const router = express.Router();

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


//Endpoint para INSERTAR personas
router.post("/Realizar_Reserva", (req, res) => {
    const sql = "CALL INSERT_RESERVAS (?, ?)"; 

    console.log("Datos recibidos:", req.body);

    // Realizar la consulta a la base de datos
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            res.status(500).send("Error al insertar datos");
        } else {
            console.log("Respuesta de la base de datos:", rows);
            res.send("Datos ingresados correctamente");
        }
    });
});


//Endpoint para SELECCIONAR personas
router.get("/Informacion_Reservas", (req,res) =>{
    const { tabla } = req.query;
    const sql = "CALL SELECT_RESERVAS (?)"; 

    mysqlConnection.query(sql, [tabla], (err, rows) => {
        if (err) {
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json(rows);
    });
});


//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

