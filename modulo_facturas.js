const express = require('express');
const router = express.Router();
const mysqlConnection = require('./conexion_BD');


// Endpoint para insertar reportes
router.post("/CrearFacturas", (req, res) => {
    const { cod_persona, cod_boleto, subtotal, descuento, metodo_pago} = req.body;
    const sql = "CALL INSERT_FACTURAS( ?, ?, ?, ?, ?)"; //Llamamos al procedure.
    
    mysqlConnection.query(
        sql,
        [cod_persona, cod_boleto, subtotal, descuento, metodo_pago ],
        (err, rows) => {
            if (!err) {
                console.log("Respuesta de la base de datos:", rows); //Depuración
                res.send("Factura ingresado correctamente!");
            } else {
                console.error("Error al insertar factura:", err);
                res.status(500).send("Error al insertar factura.");
            }
        }
    );
});

//Obtener una factura por Id
router.get("/ObtenerFacturas/:id", (req, res) => {
   
    const cod_factura = req.params.id;
    
    const sql = "CALL SELECT_FACTURAS(?)";
  
    mysqlConnection.query(sql, [cod_factura], (err, rows) => {
      if (err) {
        console.error("❌ Error:", err);
        return res.status(500).json({ message: "Error al obtener facturas" });
      }
      res.status(200).json(rows[0]);
    });
  });


//Endpoint para actualizar factura
router.put("/ActualizarFacturas/:id", (req, res) => {
    const { cod_persona, cod_boleto, fecha_facturacion, metodo_pago, descuento, subtotal } = req.body;
    const facturaId = req.params.id;
    const sql = "CALL UPDATE_FACTURAS( ?, ?, ?, ?, ?, ?, ?)"; 

    mysqlConnection.query(
        sql,
        [ facturaId, cod_persona, cod_boleto, fecha_facturacion, metodo_pago, descuento, subtotal ],
        (err, rows) => {
            if (!err) {
                res.status(200).send("Factura actualizada correctamente!");
            } else {
                console.error("Error al actualizar factura:", err);
                res.status(500).send("Error al actualizar factura.");
            }
        }
    );
});

//Endpoint para eliminar una factura
router.delete("/BorrarFacturas/:id", (req, res) => {
    const cod_factura = req.params.id;
    const sql = "CALL DELETE_FACTURAS (?)";

    mysqlConnection.query(sql, [cod_factura], (err, rows) => {
        if (!err) {
            res.status(200).send(`✅ Factura con ID ${cod_factura} eliminada correctamente!`);
        } else {
            console.error("error al eliminar factura:", err);
            res.status(500).send("Error al eliminar factura.");
        }
    });
});


module.exports = router;