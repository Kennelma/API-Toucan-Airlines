//Constante para el paquete de MYSQL
const mysql = require('mysql');

//Conectar a la base de datos (MYSQL)
var mysqlConnection = mysql.createConnection({
    host: '142.44.161.115',
    user: '1700PAC12025Equi3',
    port: 3306,
    password: '1700PAC12025Equi3#49',
    database: '1700PAC12025Equi3',
    multipleStatements: true
});

//Mensaje confirmacion al conectar inicialmente
mysqlConnection.connect((err)=>{
    if (!err){
        console.log('✅ Conexion Exitosa');
    } else { 
        console.log('❌ Error al conectar la base de datos', err.message);
    }
});

mysqlConnection.on('error', (err) => {
    console.log('Error de conexión: ', err.code); // Agrega el código del error
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
        console.log('🔄 Reconexión en proceso...');
        verificarConexion(); // Llama la función de reconexión automática
    } else {
        console.log('Error no relacionado con la reconexión', err); // Mensaje para otros errores
        throw err;
    }
});

//Se exporta la conexión a los demás archivos
module.exports = mysqlConnection;











