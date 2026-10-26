//la puta base de mierda 
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '091119',
    database: 'mierda_batiz',
    dateStrings: true,
});

module.exports = pool;