const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');

// ================================
// FACTURAS - API ESTILO UNIFICADO
// ================================

// Crear factura
router.post("/CrearFactura", (req, res) => {
    const { cod_persona, cod_boleto, subtotal, descuento, metodo_pago } = req.body;
    const sql = "CALL INSERT_FACTURAS(?, ?, ?, ?, ?)";

    console.log("📥 Datos recibidos:", req.body);

    mysqlConnection.query(sql, [cod_persona, cod_boleto, subtotal, descuento, metodo_pago], (err, rows) => {
        if (!err) {
            console.log("📤 Respuesta BD:", rows);
            res.send("Factura ingresada correctamente!");
        } else {
            console.error("❌ Error al insertar factura:", err);
            res.status(500).send("Error al insertar factura.");
        }
    });
});

// Eliminar factura
router.delete("/BorrarFactura/:id", (req, res) => {
    const cod_factura = req.params.id;
    const sql = "CALL DELETE_FACTURAS(?)";

    mysqlConnection.query(sql, [cod_factura], (err, rows) => {
        if (!err) {
            res.status(200).send(`Factura con ID ${cod_factura} eliminada correctamente!`);
        } else {
            console.error("❌ Error al eliminar factura:", err);
            res.status(500).send("Error al eliminar factura.");
        }
    });
});

// Obtener facturas
router.get("/GetFacturas", (req, res) => {
    const { valor } = req.query;
    const sql = "CALL SELECT_FACTURAS(?)";

    mysqlConnection.query(sql, [valor], (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.error("❌ Error al obtener facturas:", err);
            res.status(500).send("Error al obtener facturas.");
        }
    });
});

// Actualizar factura
router.put("/ActualizarFactura", (req, res) => {
    const factura = req.body;
    const sql = "CALL UPDATE_FACTURAS(?, ?, ?, ?, ?, ?, ?)";


    mysqlConnection.query(
        sql,
        [
            factura.cod_factura,
            factura.cod_persona,
            factura.cod_boleto,
            factura.fecha_facturacion,
            factura.metodo_pago,
            factura.descuento,
            factura.subtotal
        ],
        (err, rows) => {
            if (!err) {
                res.status(200).send("Factura actualizada correctamente!");
            } else {
                console.error("❌ Error al actualizar factura:", err);
                res.status(500).send("Error al actualizar factura.");
            }
        }
    );
});

module.exports = router;
