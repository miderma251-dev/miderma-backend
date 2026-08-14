const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',       
    user: 'root',            // Cambia esto si tu usuario en MySQL es distinto
    password: '',            // Pon tu contraseña de MySQL aquí (si no tienes, déjalo vacío)
    database: 'miderma_db',  
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('¡Conexión exitosa a la base de datos de Miderma!');
        connection.release(); 
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.message);
    });

module.exports = pool;