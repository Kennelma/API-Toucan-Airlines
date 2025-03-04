
//CRUD POST - MODULO_PERSONAS


Post: http://localhost:3000/ModuloPersonas/Insertar_Persona


{"tabla": "RESERVAS", "valores": "('fecha_ida', 'fecha_regreso', 'clase_vuelo', 'disponibilidad', 'estadia', 'cod_pasajero')"}

{"tabla": "BOLETOS", "valores": "('cod_asiento', 'fecha_vuelo', 'hora', 'destino', 'precio', 'cod_vuelo', 'cod_reserva')"}

{"tabla": "VENTAS", "valores": "('cod_reserva', 'ventas_dia', 'cod_boleto', 'fecha_venta', 'estado_venta')"}



//CRUD MODULO REPORTES

Post: http://localhost:3000/ModuloReportes/CrearReporte
{
    "TIPO_REPORTE": "",
    "FORMATO": "",
    "COD_FACTURA": "",
    "COD_BOLETO": "",
    "EMAIL_ENVIO": "",
    "COD_EMPLEADO": ""
}


Get: http://localhost:3000/ModuloReportes/GetReportes?valor=0

Put: http://localhost:3000/ModuloReportes/ActualizarReporte/0

{
  "COD_EMPLEADO": "",
  "TIPO_REPORTE": "",
  "FORMATO": "",
  "COD_FACTURA": "",
  "COD_BOLETO": "",
  "EMAIL_ENVIO": ""
}

Delete: http://localhost:3000/ModuloReportes/BorrarReporte/cod_reporte
