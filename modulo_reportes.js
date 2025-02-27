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

// Endpoint para insertar reportes
router.post("/CrearReporte", (req, res) => {
    const reporte = req.body;
    const sql = "CALL INSERT_REPORTES(?, ?, ?, ?, ?, ?, ?, ?)";
    
    console.log("Datos recibidos:", reporte); // Depuración

    mysqlConnection.query(
        sql,
        [
            reporte.COD_EMPLEADO,
            reporte.TIPO_REPORTE,
            reporte.FORMATO,
            reporte.COD_FACTURA,
            reporte.COD_BOLETO,
            reporte.EMAIL_ENVIO,
            reporte.FECHA_ENVIO,
            reporte.HORA_ENVIO
        ],
        (err, rows) => {
            if (!err) {
                console.log("Respuesta de la base de datos:", rows); // Depuración
                res.send("Reporte ingresado correctamente!");
            } else {
                console.error("Error al insertar reporte:", err);
                res.status(500).send("Error al insertar reporte.");
            }
        }
    );
});

// Endpoint para seleccionar reportes
router.get("/GetReportes", (req, res) => {
    const sql = "CALL SELECT_REPORTES()";
    
    mysqlConnection.query(sql, (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]); // Devuelve los reportes
        } else {
            console.error("Error al seleccionar reportes:", err);
            res.status(500).send("Error al seleccionar reportes.");
        }
    });
});

// Endpoint para actualizar un reporte
router.put("/ActualizarReporte/:id", (req, res) => {
    const reporte = req.body;
    const reporteId = req.params.id;
    const sql = "CALL UPDATE_REPORTES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    mysqlConnection.query(
        sql,
        [
            COD_REPORTE,
            reporte.COD_EMPLEADO,
            reporte.TIPO_REPORTE,
            reporte.FORMATO,
            reporte.COD_FACTURA,
            reporte.COD_BOLETO,
            reporte.EMAIL_ENVIO,
            reporte.FECHA_ENVIO,
            reporte.HORA_ENVIO
        ],
        (err, rows) => {
            if (!err) {
                res.status(200).send("Reporte actualizado correctamente!");
            } else {
                console.error("Error al actualizar reporte:", err);
                res.status(500).send("Error al actualizar reporte.");
            }
        }
    );
});

// Endpoint para eliminar un reporte
router.delete("/BorrarReporte/:id", (req, res) => {
    const cod_reporte = req.params.id;
    const sql = "CALL DELETE_REPORTES(?)";
    
    mysqlConnection.query(sql, [cod_reporte], (err, rows) => {
        if (!err) {
            res.status(200).send(`Reporte con ID ${cod_reporte} eliminado correctamente!`);
        } else {
            console.error("Error al eliminar reporte:", err);
            res.status(500).send("Error al eliminar reporte.");
        }
    });
});

// Exportamos el router para que pueda ser usado en index.js
module.exports = router;


