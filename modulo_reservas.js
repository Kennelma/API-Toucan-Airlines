const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');

//Endpoint para INSERTAR Reservas
router.post("/Realizar_Reserva", (req, res) => {
    const { tabla, valores } = req.body;
    const sql = "CALL INSERT_RESERVAS (?, ?)"; 

    console.log(" 📥 Datos recibidos:", req.body);

    // Realizar la consulta a la base de datos
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            res.status(500).send(" ⚠️ Error al insertar datos");
        } else {
            console.log("Respuesta de la base de datos:", rows);
            res.send(" ✅ Datos ingresados correctamente");
        }
    });
});


//SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL INDEX.JS
module.exports = router;

