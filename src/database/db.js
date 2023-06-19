// Desestructurar = Solo lo que requerimos
const { createPool} = require('mysql2/promise');

//Opciones para la conexion a la base de datos
const conexion = createPool({
    host: process.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    port: process.env.MYSQLPORT || '3306',
    database: process.env.MYSQLDATABASE || 'SiVeO'

})

//qwerty1234567
//Función que nos regrese la conexión
const getConexion = ()=>{
    return conexion;
};

//Exportamos la función para poder usarla en otro modulo (archivo .js)
module.exports.miConexion = getConexion;