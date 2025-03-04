// modulo_facturas.js
const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');

// Endpoint para actualizar factura
router.put("/Actualizar_Factura", (req, res) => {
    const { cod_factura, cod_persona, cod_boleto, metodo_pago, descuento, subtotal, total, impuesto } = req.body;

    const sql = "CALL UPDATE_FACTURA(?, ?, ?, ?, ?, ?, ?, ?)";

    console.log("Datos recibidos para actualización:", req.body);

    mysqlConnection.query(sql, [cod_factura, cod_persona, cod_boleto, metodo_pago, descuento, subtotal, total, impuesto], (err, rows) => {
        if (!err) {
            console.log("Respuesta de la base de datos:", rows);
            res.send("Factura actualizada correctamente.");
        } else {
            console.error("Error al actualizar la factura:", err);
            res.status(500).send("Error al actualizar la factura.");
        }
    });
});

// Endpoint para insertar una factura
router.post("/Crear_Factura", (req, res) => {
    const { cod_persona, cod_boleto, metodo_pago, descuento, subtotal, total, impuesto } = req.body;

    const sql = "CALL GENERAR_FACTURA(?, ?, ?, ?, ?, ?, ?)";

    console.log("Datos recibidos:", req.body);

    mysqlConnection.query(sql, [cod_persona, cod_boleto, metodo_pago, descuento, subtotal, total, impuesto], (err, rows) => {
        if (!err) {
            console.log("Respuesta de la base de datos:", rows);
            res.send("Factura creada correctamente.");
        } else {
            console.error("Error al insertar la factura:", err);
            res.status(500).send("Error al insertar la factura.");
        }
    });
});

// Exportamos el router
module.exports = router;