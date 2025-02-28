const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');

//Endpoint para INSERTAR personas
router.post("/Insertar_Persona", (req, res) => {
    const { tabla, valores } = req.body;
    const sql = "CALL INSERT_PERSONAS (?, ?)"; 

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
router.get("/Informacion_Personas", (req,res) =>{
    const { tabla, valor } = req.query;
    const sql = "CALL SELECT_PERSONAS (?, ?)"; 

    mysqlConnection.query(sql, [tabla, valor], (err, rows) => {
        if (err) {
            return res.status(500).send("Error en la consulta.");
        }
        res.status(200).json(rows);
    });
});


//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

