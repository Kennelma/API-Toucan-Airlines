const mysql = require('mysql');
const express = require('express');
const router = express.Router();

// Conexión a la base de datos
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '1700PAC12025Equi3',
    port: 3306,
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Conexión exitosa');
    } else {
        console.log('Error al conectar a la base de datos:', err);
    }
});

// Endpoint para insertar notificacion
router.post("/CrearNotificacion", (req, res) => {
    const notificacion = req.body;
    const sql = "CALL INSERT_NOTIFICACIONES(?, ?, ?, ?, ?)";

    console.log("Datos recibidos:", notificacion);  // Depuración

    mysqlConnection.query(
        sql,
        [
            notificacion.tipo_notificacion,
            notificacion.tipo_alerta,
            notificacion.cod_reserva,
            notificacion.prioridad,
            notificacion.mensaje
        ],
        (err, rows, fields) => {
            if (!err) {
                console.log("Respuesta de la base de datos:", rows);  // Depuración
                res.send("Notificacion ingresada correctamente!");
            } else {
                console.log("Error al insertar notificacion:", err);
                res.status(500).send("Error al insertar notificacion.");
            }
        }
    );
});



// Endpoint para seleccionar notificacion
router.get("/Getnotificacion", (req, res) => {
    const { cod_notificacion, pv_accion } = req.query;
    const sql = "CALL SELECT_NOTIFICACIONES (?,?)";
    mysqlConnection.query(sql, [pv_accion || "notificacion", cod_notificacion || 0], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            res.status(500).send("Error al seleccionar notificacion.");
        }
    });
});



// Endpoint para actualizar un notificacion.
router.put("/Actualizarnotificacion/:id", (req, res) => {
    const notificacion = req.body;
    const notificacionId = req.params.id;
    const sql = "CALL UPDATE_NOTIFICACIONES(?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(
        sql,
        [
            notificacionId,
            notificacion.cod_notificacion,
            notificacion.tipo_notificacion,
            notificacion.tipo_alerta,
            notificacion.prioridad,
            notificacion.mensaje,
            notificacion.cod_reserva
        ],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send("Notificacion actualizado correctamente!");
            } else {
                res.status(500).send("Error al actualizar notificacion.");
            }
        }
    );
});

// Endpoint para eliminar un notificacion
router.delete("/BorrarNotificacion/:id", (req, res) => {
    const cod_notificacion = req.params.cod_notificacion;
    const sql = "CALL DELETE_NOTIFICACIONES (?);";
    mysqlConnection.query(sql, [cod_notificacion], (err, rows, fields) => {
        if (!err) {
            res.status(200).send(`Notificacion con ID ${cod_notificacion} eliminado correctamente!`);
        } else {
            res.status(500).send("Error al eliminar Notificacion.");
        }
    });
});


// Exportamos el router
module.exports = router;