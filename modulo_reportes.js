const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD'); // Se importa la conexión de la base de datos

// Endpoint para INSERTAR datos en cualquier tabla
router.post("/Insertar_Reportes", (req, res) => {
    const { tabla, valores } = req.body;
    const sql = "CALL INSERT_REPORTES(?, ?)"; // Procedimiento almacenado genérico

    console.log("📥 Datos recibidos:", req.body);

    // Realizar la consulta a la base de datos
    mysqlConnection.query(sql, [tabla, valores], (err, rows) => {
        if (err) {
            console.error("Error al insertar los datos:", err);
            res.status(500).send("Error al insertar datos");
        } else {
            console.log("Respuesta de la base de datos:", rows);
            res.send("✅ Datos ingresados correctamente");
        }
    });
});

// Endpoint para OBTENER datos de una tabla
router.get("/Obtener_Reportes/:tabla", (req, res) => {
    const { tabla } = req.params;
    const sql = "CALL SELECT_REPORTES(?)"; // Procedimiento almacenado genérico

    mysqlConnection.query(sql, [tabla], (err, rows) => {
        if (!err) { 
            res.status(200).json(rows[0]); // Regresar los resultados de la consulta
        } else {
            console.error("Error en la consulta:", err);
            return res.status(500).send("Error en la consulta.");
        }
    });
});

// Endpoint para ELIMINAR datos de una tabla
router.delete("/Eliminar_Reporte", (req, res) => {
    const { tabla, id } = req.body;
    const sql = "CALL DELETE_REPORTES(?, ?)"; // Procedimiento almacenado genérico para eliminar datos

    mysqlConnection.query(sql, [tabla, id], (err, rows) => {
        if (!err) {
            res.status(200).send(`✅ Registro con ID ${id} eliminado correctamente!`);
        } else {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }    
    });
});

// Endpoint para ACTUALIZAR datos de una tabla
router.put("/Actualizar_Reporte", (req, res) => {
    const { tabla, id, valores } = req.body;
    
    // Crear los campos para la consulta de actualización, basados en los valores recibidos
    const camposUpdate = Object.keys(valores).map(key => `\`${key}\` = '${valores[key]}'`).join(', ');

    const sql = "CALL UPDATE_REPORTES(?, ?, ?)"; // Procedimiento almacenado genérico para actualizar datos
    
    mysqlConnection.query(sql, [tabla, id, camposUpdate], (err, rows) => {
        if (!err) {
            res.status(200).send(`✅ Registro con ID ${id} actualizado correctamente!`);
        } else {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).send("Error en la consulta.");
        }    
    });
});

// SE EXPORTA EL ROUTER PARA QUE SE PUEDA USAR EN EL index.js
module.exports = router;

