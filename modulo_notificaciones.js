const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');


// Endpoint para insertar notificación
router.post("/CrearNotificacion", (req, res) => {

    const { tipo_notificacion, tipo_alerta, cod_reserva, prioridad, mensaje } = req.body;
    
    const sql = "CALL INSERT_NOTIFICACIONES(?, ?, ?, ?, ?)";

    console.log("Datos recibidos:", req.body);

    mysqlConnection.query(sql, [tipo_notificacion, tipo_alerta, cod_reserva, prioridad, mensaje], (err, rows) => {
            
            if (!err) {
                console.log("Respuesta de la base de datos:", rows);  // Depuración
                res.send("Notificación ingresada correctamente!");
            } else {
                console.error("Error al insertar notificación:", err);
                res.status(500).send("Error al insertar notificación.");
            }
        }
    );
});



// Endpoint para eliminar un notificacion
router.delete("/BorrarNotificacion/:id", (req, res) => {
    const cod_notificacion = req.params.id;
    const sql = "CALL DELETE_NOTIFICACIONES (?)";

    mysqlConnection.query(sql, [cod_notificacion], (err, rows) => {
        if (!err) {
            res.status(200).send(`Notificacion con ID ${cod_notificacion} eliminado correctamente!`);
        } else {
            console.error("error al eliminar reporte:", err);
            res.status(500).send("Error al eliminar Notificacion.");
        }
    });
});


// Exportamos el router
module.exports = router;