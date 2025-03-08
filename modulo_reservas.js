const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');

//ENDPOINT PARA INSERTAR RESERVAS
router.post("/Realizar_Reserva", (req, res) => {
    console.log("Datos recibidos:", req.body); 
    const { tabla, valores } = req.body; 

    if (!tabla || !valores) {
        return res.status(400).send("Faltan datos en la solicitud.");
    }

    const sql = "CALL INSERT_RESERVAS (?, ?)";
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            return res.status(500).send("Error al insertar datos.");
        }
        res.send("Datos ingresados correctamente.");
    });
});


//Endpoint para SELECCIONAR reservas
router.get("/Informacion_Reserva", (req, res) => {
    console.log("Datos recibidos en la consulta:", req.query); 

    const { tabla } = req.query;  
    if (!tabla) {
        return res.status(400).send("Falta el parámetro 'tabla'.");
    }

    const sql = "CALL SELECT_RESERVAS(?)";

    mysqlConnection.query(sql, [tabla], (err, rows) => {
        if (err) {
            console.error("Error en la consulta SQL:", err); 
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json(rows);
    });
});

//ENDPOINT ACTUALIZAR RESERVAS
router.put("/Actualizar_Reserva", (req, res) => {
    const { tabla, id, valores } = req.body;
    const camposUpdate = Object.keys(valores).map(key => `\`${key}\` = '${valores[key]}'`).join(', ');
    const sql = "CALL UPDATE_RESERVAS (?, ?, ?)";
    mysqlConnection.query(sql, [tabla, id, camposUpdate], (err, rows) => {
        if (!err) {
            res.status(200).send(` ✅ Registro con ID ${id} actualizada correctamente!`);
        } else {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }    
    });
});

// Endpoint para ELIMINAR reservas
router.delete("/Eliminar_Reserva", (req, res) => {
    console.log("Consulta DELETE recibida:", req.query);

    const { tabla, valores } = req.query;
    if (!tabla || !valores) {
        return res.status(400).send("Faltan parámetros: 'tabla' y 'valores'.");
    }

    const sql = "CALL DELETE_RESERVAS(?, ?)";
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json({ mensaje: "Reserva eliminada correctamente", datos: rows });
    });
});


//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

