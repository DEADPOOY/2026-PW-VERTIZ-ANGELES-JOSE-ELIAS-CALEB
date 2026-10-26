//la puta base de mierda 
const mysql = require('mysql/promise');

const pool = mysql.createpool({
    host: 'localhsot',
    port: 3306,
    user: 'root',
    password: '091119',
    database: 'mierda_batiz',
    dateStrings: true,
});