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

// Endpoint para seleccionar notificaciones GET
router.get("/GetNotificaciones", (req, res) => {
    const { valor } = req.query;
    const sql = "CALL SELECT_NOTIFICACIONES(?)";
    
    mysqlConnection.query(sql, [valor], (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]); // Devuelve notificaciones
        } else {
            console.error("Error al seleccionar notificaciones:", err);
            res.status(500).send("Error al seleccionar notificaciones.");
        }
    });
});

// Endpoint para actualizar notificaciones UPDATE
router.put("/ActualizarNotificacion", (req, res) => {
    const notificacion = req.body; 
    const sql = "CALL UPDATE_NOTIFICACIONES(?, ?, ?, ?, ?, ?)";


    // Realiza la llamada al procedimiento almacenado

    mysqlConnection.query(
        sql, 
        [
            notificacion.cod_notificacion, 
            notificacion.cod_reserva, 
            notificacion.tipo_notificacion, 
            notificacion.tipo_alerta, 
            notificacion.prioridad, 
            notificacion.mensaje                            

        ], (err, rows) => {
        if (!err) {
                res.status(200).send("Notificacion actualizado correctamente!");
            } else {
                console.error("Error al actualizar Notificacion:", err);
                res.status(500).send("Error al actualizar Notificacion.");
            }
    });
});



// Exportamos el router
module.exports = router;