
//CRUD POST - MODULO_PERSONAS

Post: http://localhost:3000/ModuloPersonas/Insertar_Persona


{"tabla": "PERSONAS", "valores": "('nombre', 'apellido', 'edad', 'dni', 'estado_civil', 'nacionalidad')"}

{"tabla": "EMPLEADOS", "valores": "('cod_persona', 'salario', 'fecha_contratacion', 'cargo')"}

{"tabla": "USUARIOS", "valores": "('correo', 'contrasena', 'tipo_usuario', 'cod_persona')"}

{"tabla": "TELEFONOS", "valores": "('numero_telefono', 'tipo_telefono', 'cod_persona', 'cod_pais')"}

{"tabla": "PASAJEROS", "valores": "('cod_persona', 'cant_maletas', 'millas', 'puntos', 'cod_pasaporte')"}

{"tabla": "CORREOS", "valores": "('direccion_correo', 'cod_persona', 'tipo_correo')"}

{"tabla": "DIRECCIONES", "valores": "('ciudad', 'pais', 'cod_postal', 'colonia', 'cod_persona')"}


{"tabla": "RESERVAS", "valores": "('fecha_ida', 'fecha_regreso', 'clase_vuelo', 'disponibilidad', 'estadia', 'cod_pasajero')"}

{"tabla": "BOLETOS", "valores": "('cod_asiento', 'fecha_vuelo', 'hora', 'destino', 'precio', 'cod_vuelo', 'cod_reserva')"}

{"tabla": "VENTAS", "valores": "('cod_reserva', 'ventas_dia', 'cod_boleto', 'fecha_venta', 'estado_venta')"}

