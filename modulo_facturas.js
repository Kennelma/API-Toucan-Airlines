const mysql = require('mysql');
const express = require('express');
const router = express.Router();

// Conexión a la base de datos
const mysqlConnection = mysql.createConnection({
    host: '142.44.161.115',
    user: '1700PAC12025Equi3',
    password: '1700PAC12025Equi3#49',
    database: '1700PAC12025Equi3',
    port: 3306,
    multipleStatements: true
});

// Verificar conexión
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Conexión exitosa');
    } else {
        console.log('Error al conectar a la base de datos:', err);
    }
});

// Endpoint para seleccionar facturas
router.get("/GetFactura", (req, res) => {
    const { cod_factura } = req.query;
    const sql = "CALL SELECT_FACTURA(?)";
    
    mysqlConnection.query(sql, [cod_factura || 0], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log("Error al seleccionar factura:", err);
            res.status(500).send("Error al seleccionar factura.");
        }
    });
});

// Endpoint para eliminar una factura
router.delete("/BorrarFactura/:cod_factura", (req, res) => {
    const cod_factura = req.params.cod_factura;
    const sql = "CALL DELETE_FACTURA(?)";
    
    mysqlConnection.query(sql, [cod_factura], (err, rows, fields) => {
        if (!err) {
            res.status(200).send(`Factura con ID ${cod_factura} eliminada correctamente!`);
        } else {
            console.log("Error al eliminar factura:", err);
            res.status(500).send("Error al eliminar factura.");
        }
    });
});

// Exportamos el router para que pueda ser usado en index.js
module.exports = router;
